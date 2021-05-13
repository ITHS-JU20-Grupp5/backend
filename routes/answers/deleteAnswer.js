const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.delete('/questions/:questionId/answers/:answerId', (req, res) => {
    db.run('delete from answers where Id = ?', req.params.answerId, (err) => {
      if (err) {
        res.json({
          ok: false,
          error: err.message,
        });
        return;
      }
      db.run('delete from question_answers where AnswerId = ?', req.params.answerId, (juncErr) => {
        if (juncErr) {
          res.json({
            ok: false,
            error: juncErr.message,
          });
          return;
        }
        res.json({
          ok: true,
        });
      });
    });
  });
};
