module.exports = (db) => {
  db.category.hasMany(db.score);
  db.score.belongsTo(db.category);
};
