const db = require('./database');

db.run('delete from category_questions');
db.run('delete from question_answers');
db.run('delete from user_scores');
db.run('delete from score_categories');
db.run('delete from categories');
db.run('delete from questions');
db.run('delete from answers');
db.run('delete from users');
db.run('delete from scores');
