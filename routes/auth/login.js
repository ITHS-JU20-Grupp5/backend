const {
  password
} = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');
const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  })

  app.post('/auth/login', async (req, res) => {
    const user = new Promise((resolve, reject) => {
      db.get('select * from users where Username = ?', [req.body.username], async (err, row) => {
        if (err) {
          reject(`Error: ${err.message}`)
        }
        if (row) {
          let verified = await password.verify(req.body.password, row.Password)
          if (verified) {
            resolve(row);
          }
          reject('Invalid password');
        }
      });
    });
    user.then(response => {
      const accessToken = jwt.sign({
        id: response.id
      }, process.env.TOKENSECRET, {
        expiresIn: 86400 * 30
      });
      response.accessToken = accessToken;
      res.json({
        user: response
      });
      return;
    }).catch(error => {
      if (error) {
        res.send('Invalid Username or Password');
      }
    })
  });
}
