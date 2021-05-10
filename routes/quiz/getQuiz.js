const axios = require('axios');
const db = require.main.require('./utils/database');

module.exports = function (app) {
  app.post('/quiz', function (req, res) {
    const options = {
      category: req.body.category || 'random',
      // questions: req.body.questions || 10,
      difficulty: req.body.difficulty || 'easy'
    }

    // category: string, question: string, answers: array
    let quiz = {};

    //select from category
    db.get('select Id from categories where Category = ?', options.category.toUpperCase(), async function (err, row) {
      if (err) {
        res.json({
          error: err.message,
        });
        return;
      }
      let response = await axios.get(`http://localhost:3000/categories/${row.Id}/questions`)
      quiz.questions = response.data.questions;
      res.json({
        ok: true,
        quiz
      });
    });


    //limit questions

    //limit answers

  });
}
