module.exports = (db) => {
  db.category.hasMany(db.score, {
    onDelete: 'CASCADE',
  });
  db.score.belongsTo(db.category);
};
