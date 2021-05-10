const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.post('/quiz', function (req, res) {
    const options = {
      category: req.body.category || 'random',
      questions: req.body.questions || 10,
      difficlty: req.body.difficlty || 'easy'
    }

    // category: string, question: string, answers: array
    let quiz = {};


  });
}
