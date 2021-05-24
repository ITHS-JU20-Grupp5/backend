const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/users/:id/admin', verifyAdmin, async (req, res) => {
    const roleRes = await RoleController.findOrCreate({ role: 'Admin' });
    const [role] = roleRes;
    UserController.addRole(req.params.id, role.id)
      .then((newUser) => {
        res.json({
          newUser,
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
