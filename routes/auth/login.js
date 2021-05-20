const { password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

const db = require.main.require('./utils/database');

module.exports = (app) => {
  app.post('/auth/login', async (req, res) => {
    const user = new Promise((resolve, reject) => {
      db.get(
        `select 
          users.*, roles.Role 
        from 
          users 
        join 
          user_roles 
        on 
          users.Id = user_roles.UserId
        join 
          roles 
        on 
          user_roles.RoleId = roles.Id 
        where 
          Username = ?`,
        [req.body.username],
        async (err, row) => {
          if (err) {
            reject(new Error(err.message));
          }
          if (row) {
            const verified = await password.verify(req.body.password, row.Password);
            if (verified) {
              resolve(row);
            }
            reject(new Error('Invalid password'));
          }
        }
      );
    });
    user
      .then((response) => {
        const accessToken = jwt.sign(response, process.env.TOKENSECRET, {
          expiresIn: 86400 * 30,
        });
        response.accessToken = accessToken;
        res.json({
          user: response,
        });
      })
      .catch((error) => {
        if (error) {
          res.status(400).json({
            error: 'Invalid Username or Password',
          });
        }
      });
  });
};
