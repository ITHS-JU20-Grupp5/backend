const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.patch('/users/:id', (req, res) => {
    db.run(
      'update users set password = ? where Id = ?',
      [req.body.password, req.params.id],
      function (err) {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
          return;
        }
        res.json({
          ok: this.changes > 0,
        });
      }
    );
  });
};
