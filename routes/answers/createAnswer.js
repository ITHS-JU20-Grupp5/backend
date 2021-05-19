const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.post('/questions/:id/answers', (req, res) => {
    // !! converts const to a boolean value
    const correct = !!req.body.correct;
    db.run(
      'insert into answers (Answer, Correct) values (?, ?)',
      [req.body.answer, correct],
      function (err) {
        if (err) {
          res.status(400).json({
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
              res.status(400).json({
                error: juncErr.message,
              });
              return;
            }
            res.status(201).json({
              id: answerId,
            });
          }
        );
      }
    );
  });
};
