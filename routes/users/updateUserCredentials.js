const db = require.main.require('./utils/database');
const { verifyUser, password } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.patch('/users', verifyUser, async (req, res) => {
    let newPassword = req.user.Password;
    if (req.body.password) {
      newPassword = await password.encrypt(req.body.password);
    }
    const user = {
      name: req.body.name || req.user.Name,
      password: newPassword,
    };
    db.run(
      'update users set Password = ?, Name = ? where Id = ?',
      [user.password, user.name, req.user.Id],
      function (err) {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
          return;
        }
        if (this.changes > 0) {
          res.json(req.user);
        } else {
          res.status(400).json({
            error: 'Password cannot be updated',
          });
        }
      }
    );
  });
};
