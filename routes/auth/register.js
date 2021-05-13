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
      .then((response) => {
        res.json({
          ok: response.data.ok,
        });
        res.end();
      })
      .catch((err) => {
        if (err)
          res.json({
            ok: false,
            error: err.message,
          });
      });
  });
};
