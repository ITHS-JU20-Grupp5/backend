module.exports = (db) => {
  db.user.hasMany(db.score, {
    onDelete: 'CASCADE',
  });
  db.score.belongsTo(db.user);
};
