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

module.exports.findAll = () =>
  Score.findAll({
    include: [
      {
        model: User,
        as: 'users',
        attributes: ['id', 'username'],
        through: {
          attributes: [],
        },
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
        as: 'users',
        attributes: ['id', 'username'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((score) => score)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });
