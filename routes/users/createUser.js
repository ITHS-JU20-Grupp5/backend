const db = require.main.require('./utils/database');
const { validate, password } = require.main.require('./utils/utilities');

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
        error: 'Your username must be between 4 and 32 characters.',
      });
      return;
    }

    const hashedPassword = await password.encrypt(userObj.password);
    const user = [userObj.username, userObj.name, userObj.email, hashedPassword];

    db.get(
      'select * from users where Username = ? or Email = ?',
      [userObj.username, userObj.email],
      (getErr, row) => {
        if (getErr) {
          res.status(400).json({
            error: getErr.message,
          });
          return;
        }
        if (row) {
          res.status(400).json({
            error: 'That username or email already exists',
          });
          return;
        }
        db.run(
          'insert into users (Username, Name, Email, Password) values (?, ?, ?, ?)',
          user,
          function (runErr) {
            if (runErr) {
              res.status(400).json({
                error: runErr.message,
              });
              return;
            }
            res.status(201).json({
              id: this.lastID,
            });
          }
        );
      }
    );
  });
};
