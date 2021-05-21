const db = require('../utils/sequelize');

const Answer = db.answer;

module.exports.create = (answer) =>
  Answer.create(answer)
    .then((newAnswer) => newAnswer)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = () =>
  Answer.findAll()
    .then((answers) => answers)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Answer.findByPk(id)
    .then((user) => user)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });
