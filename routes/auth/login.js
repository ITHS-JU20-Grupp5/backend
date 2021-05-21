const { password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

const UserController = require.main.require('./controllers/user.controller');

module.exports = (app) => {
  app.post('/auth/login', async (req, res) => {
    UserController.findAll({ username: req.body.username }).then(async (users) => {
      if (!users) {
        res.status(400).json({
          error: 'User does not exist',
        });
        return;
      }
      const user = users[0];
      const verified = await password.verify(req.body.password, user.password);
      if (!verified) {
        res.status(400).json({
          error: 'Invalid password',
        });
        return;
      }
      const accessToken = jwt.sign(user, process.env.TOKENSECRET, {
        expiresIn: 86400 * 30,
      });
      user.accessToken = accessToken;
      res.json(user);
    });
  });
};
