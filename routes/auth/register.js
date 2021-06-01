const axios = require('axios');

const url =
  process.env.NODE_ENV === 'DEV'
    ? `http://localhost:${process.env.PORT || 3000}/users`
    : 'https://generalknowledge.azurewebsites.net/users';

module.exports = (app) => {
  app.post('/auth/register', (req, res) => {
    axios
      .post(url, {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
      })
      .then((user) => {
        res.status(201).json(user.data);
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
