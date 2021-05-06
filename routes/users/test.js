module.exports = function (app) {
  app.get('/test', (req, res) => {
    res.json({
      msg: 'Test',
    });
  });
};
