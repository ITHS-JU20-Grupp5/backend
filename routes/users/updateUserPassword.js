const db = require.main.require('./utils/database');
const { verifyToken } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.patch('/users', verifyToken, (req, res) => {
    db.run(
      'update users set password = ? where Id = ?',
      [req.body.password, req.userId],
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
