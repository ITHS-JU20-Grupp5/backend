const db = require.main.require('./utils/database');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.delete('/questions/:id', verifyAdmin, (req, res) => {
    db.run('delete from questions where Id = ?', req.params.id, (err) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      db.run('delete from category_questions where QuestionId = ?', req.params.id, (catJuncErr) => {
        if (catJuncErr) {
          res.status(400).json({
            error: catJuncErr.message,
          });
          return;
        }
        db.run(
          'delete from from question_answers where QuestionId = ?',
          req.params.id,
          (quesJuncErr) => {
            if (quesJuncErr) {
              res.status(400).json({
                error: quesJuncErr.message,
              });
              return;
            }
            res.json({
              id: req.params.id,
            });
          }
        );
      });
    });
  });
};
