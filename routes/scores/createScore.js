const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = function (app) {
  app.post('/scores', verifyToken, (req, res) => {
    const { score, category } = req.body;
    db.get('select * from scores where Score = ?', score, (getErr, row) => {
      if (getErr) {
        res.status(400).json({
          error: getErr.message,
        });
        return;
      }
      db.run(
        "insert into scores (Score,Date_Time) values (?,datetime('now','localtime'))",
        score,
        function (runErr) {
          if (runErr) {
            res.status(400).json({
              error: runErr.message,
            });
            return;
          }
          let scoreId = this.lastID;
          db.run(
            'insert into user_scores (UserId, ScoreId) values (?, ?)',
            [req.userId, this.lastID],
            function (err) {
              if (err) {
                res.json({
                  ok: false,
                  error: err.message,
                });
                return;
              }
              db.run(
                'insert into score_categories (ScoreId, CategoryId) values (?, (select Id from categories where Category = ?))',
                [scoreId, category],
                function (err) {
                  if (err) {
                    res.json({
                      ok: false,
                      error: err.message,
                    });
                    return;
                  }
                  res.json({
                    ok: true,
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};
