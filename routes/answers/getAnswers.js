const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.get('/questions/:id/answers', (req, res) => {
    let answers = [];
    db.all('select * from question_answers where QuestionId = ?', [req.params.id], (err, rows) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
      }
      let index = 0;
      rows.forEach((row) => {
        db.get(
          'select answers.Id, Answer, Correct from answers inner join questions where answers.Id = ? and questions.Id = ?',
          [row.AnswerId, row.QuestionId],
          (_getErr, getRow) => {
            answers = [getRow, ...answers];
            index++;
            if (index === rows.length) {
              res.json({
                answers,
              });
            }
          }
        );
      });
    });
  });
};
