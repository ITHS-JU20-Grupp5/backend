const db = require.main.require('./utils/database');
const password = require.main.require('./utils/passwordEncryption');

module.exports = function (app) {
  app.post('/users', async (req, res) => {
    if (!req.body.password.match (/[\w\d\S]{6,}/g)) {
      res.json({
        ok: false,
        message: 'Your password must be at least 6 characters long and contain no spaces.'
      });
      return;
    }
    const hashedPassword = await password.hash(req.body.password);
    const user = [req.body.username, req.body.name, req.body.email, hashedPassword];
    if (req.body.username.length < 4 || req.body.username.length > 32) {
      res.json({
        ok: false,
        message: 'Your username must be between 4 and 32 characters.'
      });
      return;
    }
    db.get('select * from users where Username = ? or Email = ?', [req.body.username, req.body.email], (getErr, row) => {
      if (getErr) {
        res.status(400).json({
          error: getErr.message,
        });
        return;
      }
      if (row) {
        res.json({
          ok: false,
          message: 'That username or email already exists',
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
          res.json({
            ok: true,
            id: this.lastID,
          });
        }
      );
    });
  });
};
