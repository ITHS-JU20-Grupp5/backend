const { verifyAdmin } = require.main.require('./utils/utilities');
const CategoryController = require.main.require('./controllers/category.controller');

module.exports = (app) => {
  app.delete('/categories/:id', verifyAdmin, (req, res) => {
    CategoryController.delete({
      where: {
        id: req.params.id,
      },
    })
      .then((id) => {
        res.json({
          id,
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            error: err.message,
          });
        }
      });
  });
};
