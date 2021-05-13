const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.post('/questions/:id/answers', (req, res) => {
    const correct = !!req.body.correct;
    db.run(
      'insert into answers (Answer, Correct) values (?, ?)',
      [req.body.answer, correct],
      function (err) {
        if (err) {
          res.json({
            ok: false,
            error: err.message,
          });
          return;
        }
        const answerId = this.lastID;
        db.run(
          'insert into question_answers (QuestionId, AnswerId) values (?, ?)',
          [req.params.id, answerId],
          (juncErr) => {
            if (juncErr) {
              res.json({
                ok: false,
                error: juncErr.message,
              });
              return;
            }
            res.json({
              ok: true,
              id: answerId,
            });
          }
        );
      }
    );
  });
};
