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
      .then(() => {
        res.json({
          user: {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
          },
        });
      })
      .catch((err) => err.response)
      .then((error) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            error: error.data.error,
          });
        }
      });
  });
};
