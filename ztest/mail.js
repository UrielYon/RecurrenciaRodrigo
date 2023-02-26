var nodemailer = require('nodemailer');

var smtpConfig = {
    service: "gmail",

    auth: {
        user: 'ciencias07rodrigo@gmail.com',
        pass: 'C1encias'
    }
};

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'ciencias07rodrigo@gmail.com',
        pass: 'C1encias'
    }
});

var mailOptions = {
    from: 'ciencias07rodrigo@gmail.com',
    to: 'rodrigo.rivera@ine.mx',
    subject: '[Secretaria de divulgacion]',
    html: '<h1>Welcome</h1><p>That was easy!</p>'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});