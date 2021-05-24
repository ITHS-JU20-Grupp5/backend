const axios = require('axios');


module.exports = (app) => {
  app.post('/quiz', (req, res) => {
    const options = {
      category: req.body.category || 'RANDOM',
      // Keep for later
      // In case we decide on things later on down the long long oregon trail
      // questions: req.body.questions || 5,
      // easy = 2 answers
      // normal = 4 answers
      // hard = 6 answers
      difficulty: req.body.difficulty || 'easy',
    };
    let answersAmount;
    switch (options.difficulty.toUpperCase()) {
      case 'NORMAL':
        answersAmount = 4;
        break;
      case 'HARD':
        answersAmount = 6;
        break;
      default:
        answersAmount = 2;
        break;
    }
    const quiz = {};
    db.all('select Category from categories', [], (err, rows) => {
      const categories = rows.map((row) => row.Category);
      // Select query for categories
      const query = 'select Id from categories where Category = ?';
      const params = [];
      if (options.category !== 'RANDOM') {
        params.push(options.category.toUpperCase());
      } else {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        options.category = cat;
        params.push(cat);
      }
      db.get(query, params, (getErr, row) => {
        if (getErr) {
          res.status(400).json({
            error: getErr.message,
          });
          return;
        }
        if (!row) {
          res.json({
            quiz: {},
          });
          return;
        }
        axios.get(`http://localhost:3000/categories/${row.Id}/questions`).then((questionsRes) => {
          if (questionsRes.status === 200) {
            let index = 0;
            let tempArr = [];
            const questionsJson = questionsRes.data;
            questionsJson.questions.forEach(async (question) => {
              axios
                .get(`http://localhost:3000/questions/${question.Id}/answers`)
                .then((httpRes) => {
                  const answersData = httpRes.data.answers;
                  // Create an empty array to use later
                  const answers = [];
                  // Add the correct answer to the empty array
                  answers.push(answersData.find((item) => item.Correct === 1));
                  // Filter out the correct answer and create a new array with the incorrect answers
                  const incorrect = answersData.filter((item) => item.Correct !== 1);
                  // Loop through the incorrect answers and add the necessary amount to the array
                  let incorrectTemp = 0;
                  while (incorrectTemp < answersAmount - 1) {
                    const incorrectIndex = Math.floor(Math.random() * incorrect.length);
                    // Ensure that the same answer doesn't get added twice
                    if (!answers.includes(incorrect[incorrectIndex])) {
                      answers.push(incorrect[incorrectIndex]);
                      incorrectTemp++;
                    }
                  }
                  const shuffledAnswers = answers
                    .map((a) => ({
                      sort: Math.random(),
                      value: a,
                    }))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value);
                  // Add the answers to the question object
                  question.Answers = shuffledAnswers;
                  // Using a temporary array we add the question to it for short term storage
                  tempArr = [question, ...tempArr];
                  index++;
                  // If the last question has been looped through return the quiz object containing the questions and answers
                  if (index === questionsJson.questions.length) {
                    quiz.category = options.category;
                    quiz.questions = tempArr;
                    res.json({
                      quiz,
                    });
                  }
                })
                .catch((error) => {
                  if (error) {
                    res.status(400).json({
                      error: error.message,
                    });
                  }
                });
            });
          }
        });
      });
    });
  });
};
