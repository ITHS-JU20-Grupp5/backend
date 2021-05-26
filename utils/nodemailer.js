const nodemailer = require('nodemailer');
require('dotenv').config();

//variable for obtaining user email from register.js THIS DOES NOT WORK
//const { userEmail } = require.main.require('./auth/register');

//secret variables for sending email including login credentials
const email = process.env.EMAIL;
const password = process.env.EMAILPASS;
const port = parseInt(process.env.EMAILPORT);
const host = process.env.EMAILHOST;
const group5 = 'thomas.lloyd.jones@iths.se, tobias.wadseth@iths.se, karl.albin.jartun@iths.se, gustaf.linnarsson@iths.se, kennie.svensson@iths.se, yonas.romell@iths.se'
const backEndCrew = 'thomas.lloyd.jones@iths.se, tobias.wadseth@iths.se, karl.albin.jartun@iths.se, gustaf.linnarsson@iths.se'
const me = 'thomas.lloyd.jones@iths.se'

// create reusable transporter object using the default SMTP transport
const transport = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email,
        pass: password
    },
});

//module.exports = function () {
    //Code to send email using transport object defined above
    const options = {
        from: '"General Chaos" <general-knowledge-quiz@outlook.com>',
        to: me,// userEmail, //register.req.body.email,
        subject: 'The General needs YOU...',
        text: '...TO GET DOWN AND GIVE ME 50... answers to the following questions of the day. \nWelcome to General Knowledge. Please verify your account by following this link:',
        attachments: [{
            filename: 'General.jpg',
            path: './assets/General.jpg',
            cid: 'General'
        }]
        //html: '<b>link to validation page</b>',
    };

    transport.sendMail(options, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Success: ' + info.response);
    })
//};
console.log('Email: ' + email + '\nPassword: ' + password + '\nHost: ' + host + '\nPort: ' + port);