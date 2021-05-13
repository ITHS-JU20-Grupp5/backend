const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = function (app) {
  app.get('/highscore', verifyToken, (req, res) => {
    let userId = req.userId;
    let scores = [];
    db.all(
      'select * from user_scores join score_categories where UserId = ? and user_scores.ScoreId = score_categories.ScoreId',
      [userId],
      function (err, rows) {
        if (err) {
          res.json({
            ok: false,
            error: err.message,
          });
        }
        let index = 0;
        rows.forEach((junctionRow) => {
          db.get(
            'select users.Id as UserId, Score from scores inner join users where scores.Id = ? and users.Id = ?',
            [junctionRow.ScoreId, junctionRow.UserId],
            function (err, row) {
              scores = [row, ...scores];
              index++;
              row.CategoryId = junctionRow.CategoryId;
              if (index === rows.length) {
                scores = scores.sort(function (a, b) {
                  if (a.Score > b.Score) return 1;
                  else if (a.Score < b.Score) return -1;
                  else return 0;
                });
                res.json({
                  ok: true,
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
