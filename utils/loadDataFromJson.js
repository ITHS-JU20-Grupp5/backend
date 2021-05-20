const axios = require('axios');

const http = axios.create({ baseURL: 'http://localhost:3000' });

const args = process.argv.splice(2);
const jsonFilePath = args[0];
const username = args[1];
const password = args[2];

const data = require(`../${jsonFilePath}`);

http.post('/auth/login', { username, password }).then((res) => {
  http.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
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
                console.error('Question: ', questionError.message);
              }
            });
        });
      })
      .catch((categoryError) => {
        if (categoryError) {
          console.error('Category: ', categoryError.message);
        }
      });
  });
});
