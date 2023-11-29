const nodemailer = require('nodemailer');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
// Create a transporter object
const transporter = require('../config/mailTransporter')

// Function to send an email
async function sendEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: '',
      to: to,
      subject: subject,
      html: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

async function sendEmailWithAttachment(to, subject, text, attachmentPath) {
    try {
       
      const mailOptions = {
        from: 'anupams@techsimians.com',
        to: to,
        subject: subject,
        text: text,
        attachments: [
          {
            filename: 'attachment.pdf',
            path: attachmentPath
          }
        ]
      };
      

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}



  module.exports = {sendEmail,sendEmailWithAttachment};
