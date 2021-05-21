module.exports = (db) => {
  db.category.hasMany(db.question, {
    onDelete: 'CASCADE',
  });
  db.question.belongsTo(db.category);
};
