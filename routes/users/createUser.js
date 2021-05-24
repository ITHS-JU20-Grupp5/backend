const { validate } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');

// TODO: Change external validation to internal db constraints
module.exports = (app) => {
  app.post('/users', async (req, res) => {
    const userObj = {
      username: req.body.username.trim(),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
    };
    // Validate
    if (!validate.password(userObj.password)) {
      res.status(400).json({
        error: 'Your password must be at least 6 characters long and contain no spaces.',
      });
      return;
    }
    if (!validate.email(userObj.email)) {
      res.status(400).json({
        error: 'Your email is invalid.',
      });
      return;
    }
    if (!validate.username(userObj.username)) {
      res.status(400).json({
        error: 'Your username must not contain spaces and be between 4 and 32 characters.',
      });
      return;
    }
    UserController.findOrCreate(userObj)
      .then(([user, created]) => {
        if (!created) {
          res.status(400).json({
            error: 'That username or email is already used',
          });
          return;
        }
        RoleController.findOrCreate({ role: 'User' })
          .then(([role]) => {
            UserController.addRole(user.id, role.id)
              .then((newUser) => {
                res.status(201).json({
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
          })
          .catch((err) => {
            if (err) {
              res.status(400).json({
                error: err.message,
              });
            }
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
