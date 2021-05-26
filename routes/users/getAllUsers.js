const { verifyAdmin } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.get('/users', verifyAdmin, (req, res) => {
    UserController.findAll()
      .then((users) => {
        res.json(users);
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
