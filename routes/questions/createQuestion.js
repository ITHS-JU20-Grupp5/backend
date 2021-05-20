const db = require.main.require('./utils/database');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/categories/:id/questions', verifyAdmin, (req, res) => {
    const { question } = req.body;
    if (!question) {
      res.status(400).json({
        error: 'Please enter a question',
      });
      return;
    }
    db.get('select * from questions where Question = ?', question, (getErr, row) => {
      if (getErr) {
        res.status(400).json({
          error: getErr.message,
        });
        return;
      }
      if (row) {
        res.status(409).json({
          message: 'Question already in database',
        });
        return;
      }
      db.run('insert into questions (Question) values (?)', question, function (runErr) {
        if (runErr) {
          res.status(400).json({
            error: runErr.message,
          });
          return;
        }
        const questionId = this.lastID;
        db.run(
          'insert into category_questions (CategoryId, QuestionId) values (?, ?)',
          [req.params.id, questionId],
          (err) => {
            if (err) {
              res.status(400).json({
                error: err.message,
              });
              return;
            }
            res.status(201).json({
              id: questionId,
            });
          }
        );
      });
    });
  });
};
