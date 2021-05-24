const axios = require('axios');

module.exports = (app) => {
  app.post('/auth/register', (req, res) => {
    axios
      .post('http://localhost:3000/users', {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
      })
      .then((user) => {
        res.status(201).json({
          user: user.data.newUser,
        });
      })
      .catch((err) => {
        const error = err.response;
        if (error) {
          res.status(400).json({
            error: error.data.error,
          });
        }
      });
  });
};
