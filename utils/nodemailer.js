const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// create reusable transporter object using the default SMTP transport
const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 1,
});

const readHTMLFile = (filePath, callback) => {
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

module.exports.sendVerification = (user, key) => {
  const url =
    process.env.NODE_ENV === 'DEV'
      ? `http://localhost:${process.env.PORT || 3000}`
      : `https://generalknowledge.azurewebsites.net`;

  readHTMLFile(path.join(__dirname, '/emails/verify.html'), (err, html) => {
    if (html) {
      const template = handlebars.compile(html);
      const replacements = {
        url,
        keyUrl: `${url}/auth/verify/${key}`,
      };
      const compiledHtml = template(replacements);
      const options = {
        from: 'General Chaos <general-knowledge-quiz@outlook.com>',
        to: user.email,
        subject: 'The General needs you...',
        text: `Verify your email by following this link: ${url}`,
        html: compiledHtml,
      };

      transport.sendMail(options, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
};

module.exports.sendSpam = (user) => {
  const url =
    process.env.NODE_ENV === 'DEV'
      ? `http://localhost:${process.env.PORT || 3000}`
      : `https://generalknowledge.azurewebsites.net`;

  const categories = ['General Knowledge', 'History', 'Sports', 'Geography', 'Music'];

  readHTMLFile(path.join(__dirname, '/emails/daily.html'), (err, html) => {
    if (html) {
      const template = handlebars.compile(html);
      const replacements = {
        url: 'https://generalknowledge-quiz.herokuapp.com/quiz',
        name: user.name,
        category: categories[Math.floor(Math.random() * categories.length)].toLowerCase(),
        unsubUrl: `${url}/user/emails?email=${user.email}`,
      };
      const compiledHtml = template(replacements);
      const options = {
        from: 'General Chaos <general-knowledge-quiz@outlook.com>',
        to: user.email,
        subject: 'The General needs you...',
        text: `Coming soon`,
        html: compiledHtml,
      };

      transport.sendMail(options, (error) => {
        if (error) {
          console.log(error);
        }
      });
    }
  });
};
