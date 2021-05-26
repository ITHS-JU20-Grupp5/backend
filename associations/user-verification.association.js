module.exports = (db) => {
  db.user.hasOne(db.verification, {
    onDelete: 'CASCADE',
  });
  db.verification.belongsTo(db.user);
};
