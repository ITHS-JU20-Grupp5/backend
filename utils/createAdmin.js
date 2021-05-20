const db = require('./database');

db.run(
  // "update user_roles set RoleId = (select Id from roles where Role = 'ADMIN') where UserId = ?",
  "insert into user_roles (UserId, RoleId) values (?, (select Id from roles where Role = 'ADMIN'))",
  process.argv.splice(2)[0],
  function (err) {
    if (err || this.changes <= 0) {
      console.log("Couldn't make user an admin");
      return;
    }
    console.log('Made user an admin');
  }
);
