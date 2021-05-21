module.exports = (db) => {
  db.user.hasMany(db.score);
  db.score.belongsTo(db.user);
};
