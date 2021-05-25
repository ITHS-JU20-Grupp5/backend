const VerificationController = require.main.require('./controllers/verification.controller');
const UserController = require.main.require('./controllers/user.controller');
const RoleController = require.main.require('./controllers/role.controller');

//1. Get user connected to verification UUID
module.exports = (app) => {
    app.get('/auth/verification/:UUID', (req, res) => {
        VerificationController.findOne(req.params.UUID)
            .then ((verification) => {
                if (!verification) {
                    res.status(400).json({
                        error: 'Verification value not found',
                    });
                    return;
                }
                const user = verification.getUser();
                //find user role
                RoleController.findOrCreate({role: 'User'})
                    .then (([role]) => {
                        UserController.addRole(user.id, role.id)
                            .then (async () => {
                                await verification.destroy();
                                res.json({
                                    message: 'User verified'
                                })
                            })
                            .catch((err) => {
                                if (err) {
                                    res.status(400).json({
                                        error: err.message,
                                    })
                                }
                            })//removes verification role from DB
                    }).catch((err) => {
                    if (err) {
                        res.status(400).json({
                            error: err.message,
                        })
                    }
                })
            }).catch((err) => {
            if (err) {
                res.status(400).json({
                    error: err.message,
                })
            }
        })
    });
}

//2. Update user roles with the user role


//3. Remove verification UUID from db