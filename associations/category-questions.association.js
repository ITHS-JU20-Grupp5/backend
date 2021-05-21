module.exports = (db) => {
  db.category.hasMany(db.question);
  db.question.belongsTo(db.category);
};
