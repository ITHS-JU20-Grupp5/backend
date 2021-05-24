const db = require('../utils/sequelize');

const Category = db.category;
const Score = db.score;
const Question = db.question;

module.exports.create = (category) =>
  Category.create(category)
    .then((newCategory) => newCategory)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = (where = {}) =>
  Category.findAll({
    where,
    include: [
      {
        model: Question,
      },
    ],
  })
    .then((categories) => categories)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Category.findByPk(id, {
    include: [
      {
        model: Question,
      },
    ],
  })
    .then((categories) => categories)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findOne = (where = {}) =>
  Category.findAll({ where, include: [{ model: Question }] })
    .then((categories) => {
      if (!categories) {
        console.log('No category was found');
        return null;
      }
      return categories[0];
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.nessage);
      }
    });

module.exports.findOrCreate = (values) =>
  Category.findOrCreate({
    where: { category: values.category },
    defaults: { category: values.category },
  })
    .then((category) => category)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.addScore = (categoryId, scoreId) =>
  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        console.log('No category was found');
        return null;
      }
      return Score.findByPk(scoreId).then((score) => {
        if (!score) {
          console.log('No score was found');
          return null;
        }
        category.addScore(score);
        console.log(`Added score: ${score.score} to category: ${category.category}`);
        return category;
      });
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.addQuestion = (categoryId, questionId) =>
  Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        console.log('No category was found');
        return null;
      }
      return Question.findByPk(questionId).then((question) => {
        if (!question) {
          console.log('No question was found');
          return null;
        }
        category.addQuestion(question);
        console.log(`Added question: ${question.question} to category: ${category.category}`);
        return category;
      });
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.delete = (options) =>
  Category.destroy(options)
    .then((res) => res)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });
