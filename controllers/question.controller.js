const db = require('../utils/sequelize');

const Question = db.question;
const Answer = db.answer;

module.exports.create = (question) =>
  Question.create(question)
    .then((newQuestion) => newQuestion)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findAll = () =>
  Question.findAll({
    include: [
      {
        model: Answer,
        as: 'answers',
        attributes: ['id', 'answer'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((questions) => questions)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.findById = (id) =>
  Question.findByPk(id, {
    include: [
      {
        model: Answer,
        as: 'answers',
        attributes: ['id', 'answer'],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((questions) => questions)
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });

module.exports.addAnswer = (questionId, answerId) =>
  Question.findByPk(questionId)
    .then((question) => {
      if (!question) {
        console.log('No question was found');
        return null;
      }
      return Answer.findByPk(answerId).then((answer) => {
        if (!answer) {
          console.log('No answer was found');
          return null;
        }
        question.addAnswer(answer);
        console.log(`Added answer: ${answer.answer} to question: ${question.question}`);
        return question;
      });
    })
    .catch((err) => {
      if (err) {
        console.error('Error: ', err.message);
      }
    });
