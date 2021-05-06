const sqlite = require('sqlite3');

const DBFILE = 'general-knowledge.db';

export const db = new sqlite.Database(DBFILE, (err) => {
    if (err) {
       console.error('Database Error', err.message);
       throw err;
    }
});