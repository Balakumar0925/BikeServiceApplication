var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'balakumar0925@gmail.com',
    pass: '950513104012'
  }
});



function sendEmail(sendTo, subject, body) {
    var mailOptions = {
        from: 'balakumar0925@gmail.com',
        to: sendTo,
        subject: subject,
        text: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports= sendEmail;