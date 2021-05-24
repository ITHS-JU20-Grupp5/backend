const { password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.post('/auth/login', async (req, res) => {
    UserController.findOne({ username: req.body.username }).then(async (user) => {
      if (!user) {
        res.status(400).json({
          error: 'User does not exist',
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
        name: user.username,
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
};
