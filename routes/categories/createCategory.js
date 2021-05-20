const db = require.main.require('./utils/database');
const { verifyAdmin } = require.main.require('./utils/utilities');

module.exports = (app) => {
  app.post('/categories', verifyAdmin, (req, res) => {
    const category = req.body.category.toUpperCase();
    db.get('select * from categories where Category = ?', category, (getErr, row) => {
      if (getErr) {
        res.status(400).json({
          error: getErr.message,
        });
        return;
      }
      if (row) {
        res.status(409).json({
          message: 'That category already exists',
        });
        return;
      }
      db.run('insert into categories(Category) values (?)', category, function (runErr) {
        if (runErr) {
          res.status(400).json({
            error: runErr.message,
          });
          return;
        }
        res.status(201).json({
          id: this.lastID,
        });
      });
    });
  });
};
