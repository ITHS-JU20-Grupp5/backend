const axios = require('axios');

const http = axios.create({ baseURL: 'http://localhost:3000' });

const jsonFilePath = process.argv.splice(2)[0];

const data = require(`../${jsonFilePath}`);

data.users.forEach((user) => {
  http.post('/users', user).catch((userErr) => {
    if (userErr) {
      console.error(userErr.message);
    }
  });
});

data.quiz.forEach((quizObj) => {
  const { category, questions } = quizObj;
  http
    .post('/categories', { category })
    .then((categoryPost) => {
      questions.forEach((questionObj) => {
        const { question, answers } = questionObj;
        http
          .post(`/categories/${categoryPost.data.id}/questions`, { question })
          .then((questionPost) => {
            answers.forEach((answerObj) => {
              http.post(`/questions/${questionPost.data.id}/answers`, answerObj);
            });
          })
          .catch((questionError) => {
            if (questionError) {
              console.error(questionError.message);
            }
          });
      });
    })
    .catch((categoryError) => {
      if (categoryError) {
        console.error(categoryError.message);
      }
    });
});
