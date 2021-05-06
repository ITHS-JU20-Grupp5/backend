const db = require.main.require('./database');

module.exports = function (app) {
  app.post('/users', (req, res) => {
    const user = [req.body.username, req.body.name, req.body.email, req.body.password];
    db.get('select * from users where Username = ?', req.body.username, (getErr, row) => {
      if (getErr) {
        res.status(400).json({
          error: getErr.message,
        });
        return;
      }
      if (row) {
        res.json({
          ok: false,
          message: 'That username already exists',
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
