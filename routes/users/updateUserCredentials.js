const { verifyUser, password } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.patch('/users', verifyUser, async (req, res) => {
    let newPassword = req.user.password;
    if (req.body.password) {
      newPassword = await password.encrypt(req.body.password);
    }

    UserController.update({
      id: req.user.id,
      name: req.body.name || req.user.name,
      password: newPassword,
    })
      .then(([, updatedUser]) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
      });
  });
};
