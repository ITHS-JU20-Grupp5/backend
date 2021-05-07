const db = require.main.require('./utils/database');

module.exports = function (app) {
    app.post('/questions', async (req, res) => {
        const question = req.body.question;
        db.get("select * from questions where Question = ?", question, (getErr, row) => {
            if (getErr) {
                res.status(400).json({
                    error: getErr.message,
                });
                return;
            }
            if (row) {
                res.json({
                    ok: false,
                    message: 'Question already in database',
                });
                return;
            }
            db.run(
                'insert into questions (Question) values (?)',
                question,
                function (runErr) {
                    if (runErr) {
                        res.status(400).json({
                            error: runErr.message,
                        });
                        return;
                    }
                    res.json({
                        ok: true,
                        id: this.lastId,
                    });
                }
            );
        });
    });
}