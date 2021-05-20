const db = require.main.require('./utils/database');
const { verifyUser } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.get('/scores', verifyUser, (req, res) => {
    const { userId } = req;
    let scores = [];
    db.all(
      'select * from user_scores join score_categories where UserId = ? and score_categories.ScoreId = user_scores.ScoreId',
      [userId],
      (err, rows) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
        let index = 0;
        if (rows.length === 0) {
          res.status(204).json({});
          return;
        }
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
              row.CategoryId = junctionRow.CategoryId;
              scores = [row, ...scores];
              index++;
              if (index === rows.length) {
                res.json({
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
