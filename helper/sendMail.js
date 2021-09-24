var nodemailer = require("nodemailer");

function sendEmail(param, email) {
  var transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "hacktrian@outlook.com",
      pass: "123456789/*-",
    },
  });

  var mailOptions = {
    from: "hacktrian@outlook.com",
    to: `${email}`,
    subject: "Sending Email using Node.js",
    text: `hint kamu adalah : ${param}
Tolong jangan disebar luaskan
Digunakan ketika lupa password`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// console.log(sendEmail("wkwkwkwkwk"));
module.exports = sendEmail;
