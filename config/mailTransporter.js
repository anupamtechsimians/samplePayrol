const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP host
    port: 587, // Replace with your SMTP port
    secure: false, // Set to true if you are using SSL/TLS
    auth: {
      user: 'pawanfarde999@gmail.com', // Replace with your email
      pass: 'xybq wfhp bvnc leij', // Replace with your email password or use environment variable
    },
  });

  module.exports = transporter;