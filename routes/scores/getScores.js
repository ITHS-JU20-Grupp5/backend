const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/scores', verifyToken, (req, res) => {
    const { userId } = req;
    let scores = [];
    db.all(
      'select * from user_scores join score_categories where UserId = ? and score_categories.ScoreId = user_scores.ScoreId',
      [userId],
      (err, rows) => {
        if (err) {
          res.json({
            ok: false,
            error: err.message,
          });
        }
        let index = 0;
        if (rows.length === 0) {
          res.json({
            ok: true,
            scores: [],
          });
          return;
        }
        console.log(rows);
        rows.forEach((junctionRow) => {
          db.get(
            'select users.Id as UserId, Score from scores inner join users where scores.Id = ? and users.Id = ?',
            [junctionRow.ScoreId, junctionRow.UserId],
            (getErr, row) => {
              if (getErr) {
                res.json({
                  ok: false,
                  error: getErr.message,
                });
                return;
              }
              row.CategoryId = junctionRow.CategoryId;
              scores = [row, ...scores];
              index++;
              if (index === rows.length) {
                res.json({
                  ok: true,
                  scores,
                });
              }
            }
          );
        });
      }
    );
  });
};
