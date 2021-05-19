const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.get('/categories/:id', (req, res) => {
    db.get('select * from categories where Id = ?', req.params.id, (err, row) => {
      if (err) {
        res.status(400).json({
          error: err.message
        });
        return;
      }
      res.json({
        category: row
      });
    });
  });
};
