const { verifyAdmin } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.get('/users/:id', verifyAdmin, (req, res) => {
    UserController.findById(req.params.id).then((user) => {
      if (!user) {
        res.status(404).json({
          error: 'No user was found',
        });
        return;
      }
      res.json(user);
    });
  });
};
