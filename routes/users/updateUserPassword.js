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
          if (this.changes > 0) {
              res.json({
                  id: req.userId
              });
          } else {
              res.status(400).json({
                  error: 'Password cannot be updated'
              });
          }
      }
    );
  });
};
