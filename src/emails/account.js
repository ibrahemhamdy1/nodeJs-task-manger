const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from:'mslm356@gmail.com',
        to: email,
        subject: 'Thanks for joining us',
        text: `welcome to the app ${name}, let me know how you get along with the app`,
    });
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        from:'mslm356@gmail.com',
        to: email,
        subject: 'Sorry to see you go',
        text: `GoodBye, ${name}. I hope to see you back sometime soon`,
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

