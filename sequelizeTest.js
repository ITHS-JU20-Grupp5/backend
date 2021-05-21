require('dotenv').config();

const db = require('./utils/sequelize');
const { password } = require('./utils/utilities');
const UserController = require('./controllers/user.controller');
const RoleController = require('./controllers/role.controller');
const ScoreController = require('./controllers/score.controller');
const CategoryController = require('./controllers/category.controller');
const QuestionController = require('./controllers/question.controller');
const AnswerController = require('./controllers/answer.controller');

const options = {
  force: true,
};

db.sequelize.sync(options).then(async () => {
  console.log('Connected');
  //! Create users
  // const userRole = await RoleController.create({ role: 'User' });
  // console.log('Added user role');
  // const adminRole = await RoleController.create({ role: 'Admin' });
  // console.log('Added admin role');
  /* const user = await UserController.create({
   username: 'tobias',
    name: 'Tobias Wadseth',
    email: 'twadseth@icloud.com',
    password: await password.encrypt('password123'),
  });*/
  // console.log('Created user: tobias');
  // const adminUser = await UserController.create({
  //   username: 'admin',
  //   name: 'Administrator',
  //   email: 'admin@generalknowledge.com',
  //   password: 'password123',
  // });
  // console.log('Created user: admin');

  //! Fetch users
  // const user = await UserController.findById(1);
  // const admin = await UserController.findById(2);

  //! Fetch roles
  // const userRole = await RoleController.findById(1);
  // const adminRole = await RoleController.findById(2);

  //! Set roles
  // UserController.addRole(user.id, 1);
  // UserController.addRole(admin.id, 2);

  //! Log
  // console.log(user.username, userRole.role);
  // console.log(admin.username, adminRole.role);
  //console.log(JSON.stringify(user, null, 2));

  const role = await RoleController.create({ role: 'user' });
  const user = await UserController.create({
    username: 'tobias',
    name: 'Tobias Wadseth',
    email: 'twadseth@icloud.com',
    password: await password.encrypt('password123'),
  });

  const category = await CategoryController.create({ category: 'Sports' });
  const score = await ScoreController.create({ score: '9' });

  const question = await QuestionController.create({
    question: 'Hur många bultar finns det i Ölandsbron?',
  });

  const answer = await AnswerController.create({ answer: '400', correct: true });

  await UserController.addRole(user.id, role.id);
  await UserController.addScore(user.id, score.id);
  await CategoryController.addScore(category.id, score.id);
  await CategoryController.addQuestion(category.id, question.id);
  await QuestionController.addAnswer(question.id, answer.id);
  console.log('ITS WORKING ANAKIN');
});
