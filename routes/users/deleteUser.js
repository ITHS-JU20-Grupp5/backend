const { verifyAdmin } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.delete('/users/:id', verifyAdmin, (req, res) => {
    UserController.delete({ where: { id: req.params.id } })
      .then((id) => {
        res.json({ id });
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
