const db = require.main.require('./database');

module.exports = function (app) {
  app.get('/users', (req, res) => {
    db.all('select * from users', [], (err, rows) => {
      if (err) {
        res.status(400).json({
          error: err.message,
        });
        return;
      }
      res.json({
        ok: true,
        users: rows,
      });
    });
  });
};
