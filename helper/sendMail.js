var nodemailer = require('nodemailer');

function sendEmail(param){
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'hacktrian@outlook.com',
          pass: '123456789/*-'
        }
      });
      
      var mailOptions = {
        from: 'hacktrian@outlook.com',
        to: 'vincentius.donovan.fgo12@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `That was easy! ${param}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

// console.log(sendEmail('wkwkwkwkwk'))
module.exports = sendEmail