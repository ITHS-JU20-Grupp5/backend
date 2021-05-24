const { verifyUser, password } = require.main.require('./utils/utilities');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // app.patch('/users', verifyUser, async (req, res) => {
  //   let newPassword = req.user.Password;
  //   if (req.body.password) {
  //     newPassword = await password.encrypt(req.body.password);
  //   }
  //   const user = {
  //     name: req.body.name || req.user.Name,
  //     password: newPassword,
  //   };
  //   db.run(
  //     'update users set Password = ?, Name = ? where Id = ?',
  //     [user.password, user.name, req.user.Id],
  //     function (err) {
  //       if (err) {
  //         res.status(400).json({
  //           error: err.message,
  //         });
  //         return;
  //       }
  //       if (this.changes > 0) {
  //         req.user.Password = newPassword;
  //         req.user.Name = user.name;
  //         db.run(
  //           'insert into banned_tokens (Token) values (?)',
  //           req.headers.authorization.split(' ')[1],
  //           () => {
  //             const tempUser = {
  //               Id: req.user.Id,
  //               Username: req.user.Username,
  //               Name: req.user.Name,
  //               Email: req.user.Email,
  //               Password: req.user.Password,
  //               Roles: req.user.Roles,
  //             };
  //             const accessToken = jwt.sign(tempUser, process.env.TOKENSECRET, {
  //               expiresIn: 86400 * 30,
  //             });
  //             tempUser.accessToken = accessToken;
  //             res.json(tempUser);
  //           }
  //         );
  //       } else {
  //         res.status(400).json({
  //           error: 'Password cannot be updated',
  //         });
  //       }
  //     }
  //   );
  // });
};
