const UserController = require.main.require('./controllers/user.controller');
const { verifyUser } = require.main.require('./utils/utilities');
module.exports = (app) => {
  app.patch('/users/emails', verifyUser, (req, res) => {
    UserController.updateSpam(req.user.id)
      .then(() => {
        res.json({
          message: 'Updated email settings',
        });
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
