const db = require('../utils/sequelize');

const Verification = db.verification;

module.exports.create = () =>
    Verification.create()
    .then((newVerification) => newVerification)
    .catch((err) => {
        if (err) {
            console.error('Error: ', err.message);
        }
    });

module.exports.findOne = (UUID) =>
    Verification.findOne({where: {key: UUID}})
        .then((verification) => {
            if (!verification) {
                console.log('No verification value was found');
                return null;
            }
            return verification;
        })
        .catch((err) => {
            if (err) {
                console.error('Error: ', err.message);
            }
        });
