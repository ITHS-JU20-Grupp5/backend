const { validate, password } = require.main.require('./utils/utilities');
const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');
const VerificationController = require.main.require('./controllers/verification.controller');
const { sendVerification } = require.main.require('./utils/nodemailer');

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
    userObj.password = await password.encrypt(userObj.password);
    UserController.findOne({ username: userObj.username })
      .then((userByUsername) => {
        if (!userByUsername) {
          UserController.findOne({ email: userObj.email })
            .then((userByEmail) => {
              if (!userByEmail) {
                UserController.create(userObj)
                  .then((user) => {
                    RoleController.findOrCreate({ role: 'Unverified' })
                      .then(([role]) => {
                        UserController.addRole(user.id, role.id)
                          .then(() => {
                            VerificationController.create()
                              .then((verification) => {
                                UserController.setVerification(user.id, verification.id)
                                  .then((newUser) => {
                                    sendVerification(newUser, verification.key);
                                    res.status(201).json(newUser);
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
              } else {
                res.status(400).json({
                  error: 'That email is already in use',
                });
              }
            })
            .catch((err) => {
              if (err) {
                res.status(400).json({
                  error: err.message,
                });
              }
            });
        } else {
          res.status(400).json({
            error: 'That username is already in use',
          });
        }
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
