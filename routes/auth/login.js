const { password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');

module.exports = (app) => {
  app.post('/auth/login', (req, res) => {
    UserController.findOne({ username: req.body.username }).then((user) => {
      if (!user) {
        res.status(400).json({
          error: 'User does not exist',
        });
        return;
      }
      RoleController.findOne({ role: 'User' }).then(async (role) => {
        if (!user.hasRole(role)) {
          res.status(401).json({
            message: 'Please verify your account',
          });
          return;
        }
        const verified = await password.verify(req.body.password, user.password);
        if (!verified) {
          res.status(400).json({
            error: 'Invalid password',
          });
          return;
        }
        user = JSON.parse(JSON.stringify(user, null, 4));
        const accessToken = jwt.sign(user, process.env.TOKENSECRET, {
          expiresIn: '30d',
        });
        const newUser = {
          username: user.username,
          name: user.name,
          email: user.email,
          password: user.password,
          roles: user.roles,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          accessToken,
        };
        res.json(newUser);
      });
    });
  });
};
