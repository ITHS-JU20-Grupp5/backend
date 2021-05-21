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

module.exports.findAll = () =>
  Category.findAll({
    include: [
      {
        model: Question,
        as: 'questions',
        attributes: ['id', 'question'],
        through: {
          attributes: [],
        },
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
        as: 'questions',
        attributes: ['id', 'question'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((categories) => categories)
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
          console.log('No score was found');
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
