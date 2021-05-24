const db = require('../utils/sequelize');

const User = db.user;
const Score = db.score;

module.exports.create = (score) =>
  Score.create(score)
    .then((newScore) => newScore)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = (where = {}) =>
  Score.findAll({
    where,
    include: [
      {
        model: User,
      },
    ],
  })
    .then((scores) => scores)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Score.findByPk(id, {
    include: [
      {
        model: User,
      },
    ],
  })
    .then((score) => score)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.delete = (options) =>
  Score.destroy(options)
    .then((res) => res)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });
