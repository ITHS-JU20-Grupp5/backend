const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.get('/categories/:id/questions', (req, res) => {
    let questions = [];
    db.all(
      'select * from category_questions where CategoryId = ?',
      [req.params.id],
      (err, rows) => {
        if (err) {
          res.json({
            ok: false,
            error: err.message,
          });
        }
        let index = 0;
        const amount = req.query.questions || Math.min(rows.length, 5);
        rows.forEach((row) => {
          db.get(
            'select questions.Id, Question from questions inner join categories where questions.Id = ? and categories.Id = ? order by RANDOM()',
            [row.QuestionId, row.CategoryId],
            (getErr, getRow) => {
              questions = [getRow, ...questions];
              index++;
              if (index === amount) {
                res.json({
                  ok: true,
                  questions,
                });
              }
            }
          );
        });
      }
    );
  });
};
