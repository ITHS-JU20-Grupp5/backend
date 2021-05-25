//Our email:
//general-knowledge-quiz@outlook.com
//ITHSJU20-THE-FIFTH-GROUP
//smtp-mail.outlook.com
//port 587 || port 25
//SMTP TLS/SSL Encryption Required? You betcha.

//Server name: smtp.office365.com
//Encryption method: STARTTLS

//This is a complete example to send an email with plain text and HTML body
"use strict";
const nodemailer = require('nodemailer');
const nodeoutlook = require('nodejs-nodemailer-outlook')
const bodyParser = require('body-parser');

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'general-knowledge-quiz@outlook.com', // generated ethereal user
            pass: 'ITHSJU20-THE-FIFTH-GROUP', // generated ethereal password
        },
    });

    // send mail with defined transport object
    const options = {
        from: '"General Chaos" <general-knowledge-quiz@outlook.com>', // sender address
        to: 'thomas.lloyd.jones@iths.se, gustaf.linnarsson@iths.se, karl.albin.jartun@iths.se, tobias.wadseth@iths.se', // list of receivers
        subject: 'The General has a message for you...', // Subject line
        text: 'GET DOWN AND GIVE ME 50... questions \nWelcome to General Knowledge. Please verify your account by following this link:', // plain text body
        //html: '<b>Welcome to General Knowledge. Please verify your account by following this link:</b>', // html body
    };

    transporter.sendMail(options, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Success: ' + info.response);
    })
