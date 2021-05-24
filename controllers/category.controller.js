const { Op } = require('sequelize');

const db = require('../utils/sequelize');

const Category = db.category;
const Score = db.score;
const Question = db.question;
const Answer = db.answer;

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
        include: [{ model: Answer }],
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
        include: [{ model: Answer }],
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
  Category.findOne({ where, include: [{ model: Question, include: [{ model: Answer }] }] })
    .then((category) => {
      if (!category) {
        console.log('No category was found');
        return null;
      }
      return category;
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findOrCreate = (values) =>
  Category.findOrCreate({
    where: { category: { [Op.iLike]: values.category } },
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

module.exports.findForQuiz = (category = 'Allmän Fakta') =>
  Category.findOne({
    where: { category: { [Op.iLike]: category } },
    include: [
      {
        model: Question,
        limit: 5,
        order: db.sequelize.random(),
        include: [
          {
            model: Answer,
            limit: 10000,
            order: db.sequelize.random(),
          },
        ],
      },
    ],
  })
    .then((cat) => {
      if (!cat) {
        console.log('No category was found');
        return null;
      }
      return cat;
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findRandomForQuiz = () =>
  Category.findAll().then((categories) => {
    const { category } = categories[Math.floor(Math.random() * categories.length)];
    return this.findForQuiz(category);
  });
