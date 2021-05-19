const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/highscore', verifyToken, (req, res) => {
    const { userId } = req;
    let scores = [];
    db.all(
      'select * from user_scores join score_categories where UserId = ? and user_scores.ScoreId = score_categories.ScoreId',
      [userId],
      (err, rows) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
        let index = 0;
        rows.forEach((junctionRow) => {
          db.get(
            'select users.Id as UserId, Score from scores inner join users where scores.Id = ? and users.Id = ?',
            [junctionRow.ScoreId, junctionRow.UserId],
            (getErr, row) => {
              if (getErr) {
                res.status(400).json({
                  error: getErr.message,
                });
                return;
              }
              scores = [row, ...scores];
              index++;
              row.CategoryId = junctionRow.CategoryId;
              if (index === rows.length) {
                scores = scores.sort((a, b) => {
                  if (a.Score > b.Score) return 1;
                  if (a.Score < b.Score) return -1;
                  return 0;
                });
                res.json({
                  score: scores[scores.length - 1],
                });
              }
            }
          );
        });
      }
    );
  });
};
