const { password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.post('/auth/login', async (req, res) => {
    const user = new Promise((resolve, reject) => {
      db.get('select * from users where Username = ?', [req.body.username], async (err, row) => {
        if (err) {
          reject(new Error(err.message));
        }
        if (row) {
          const verified = await password.verify(req.body.password, row.Password);
          if (verified) {
            db.all(
              'select Role from user_roles join roles on RoleId = Id where UserId = ?',
              row.Id,
              (allErr, rows) => {
                if (allErr) {
                  res.status(400).json({
                    error: allErr.message,
                  });
                  return;
                }
                const roles = [];
                rows.forEach((role) => {
                  roles.push(role.Role);
                });
                row.Roles = roles;
                resolve(row);
              }
            );
          }
        } else {
          reject(new Error('Invalid password'));
        }
      });
    });
    user
      .then((response) => {
        const accessToken = jwt.sign(response, process.env.TOKENSECRET, {
          expiresIn: 86400 * 30,
        });
        response.accessToken = accessToken;
        res.json(response);
      })
      .catch((error) => {
        if (error) {
          res.status(400).json({
            error: error.message,
          });
        }
      });
  });
};
