const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.patch('/questions/:id', (req, res) => {
    db.run(
      'update questions set question = ? where Id = ?',
      [req.body.question, req.params.id],
      function (err) {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
          return;
        }
        if (this.changes > 0) {
          res.json({
            id: req.params.id,
          });
        } else
          res.status(400).json({
            error: 'Invalid id',
          });
      }
    );
  });
};
