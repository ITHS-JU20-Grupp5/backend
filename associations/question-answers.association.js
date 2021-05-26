module.exports = (db) => {
  db.question.hasMany(db.answer, {
    onDelete: 'CASCADE',
  });
  db.answer.belongsTo(db.question);
};
