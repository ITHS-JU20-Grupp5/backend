const axios = require('axios');

const http = axios.create({ baseURL: 'http://localhost:3000' });

let jsonFilePath = process.argv.splice(2)[0];

const data = require(`../${jsonFilePath}`);

data.users.forEach(async (user) => {
  http.post('/users', user);
});

data.quiz.forEach(async (obj) => {
  const { category, questions } = obj;
  const categoryPost = await http.post('/categories', { category });
  questions.forEach(async (questionObj) => {
    const { question, answers } = questionObj;
    const questionPost = await http.post(`/categories/${categoryPost.data.id}/questions`, {
      question,
    });
    answers.forEach((answerObj) => {
      http.post(`/questions/${questionPost.data.id}/answers`, answerObj);
    });
  });
});
