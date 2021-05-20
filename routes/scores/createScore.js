const db = require.main.require('./utils/database');
const { verifyUser } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/scores', verifyUser, (req, res) => {
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
          [req.user.Id, this.lastID],
          (err) => {
            if (err) {
              res.status(400).json({
                error: err.message,
              });
              return;
            }
            db.run(
              'insert into score_categories (ScoreId, CategoryId) values (?, (select Id from categories where Category = ?))',
              [scoreId, category.toUpperCase()],
              (scoreCatErr) => {
                if (scoreCatErr) {
                  res.status(400).json({
                    error: scoreCatErr.message,
                  });
                  return;
                }
                res.json({
                  id: scoreId,
                });
              }
            );
          }
        );
      }
    );
  });
};
