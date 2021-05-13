const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/scores', verifyToken, (req, res) => {
    const { score, category } = req.body;
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
        const scoreId = this.lastID;
        db.run(
          'insert into user_scores (UserId, ScoreId) values (?, ?)',
          [req.userId, this.lastID],
          (err) => {
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
              (scoreCatErr) => {
                if (scoreCatErr) {
                  res.json({
                    ok: false,
                    error: scoreCatErr.message,
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
};
