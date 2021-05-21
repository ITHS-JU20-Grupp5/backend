module.exports = (db) => {
  db.question.hasMany(db.answer);
  db.answer.belongsTo(db.question);
};
