const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.get('/questions/:id', (req, res) => {
    db.get('select * from questions where Id = ?', req.params.id, (err, row) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      if (!row) {
        res.status(400).json({
          message: 'Invalid question Id',
        });
      } else {
        res.json({
          question: row,
        });
      }
    });
  });
};
