const nodemailer = require('nodemailer');



const sendMail = (to, subject, text, html, attachments) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports

        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        },
    });
    const att = attachments.map(attachment => {
        return {
            href: attachment
        }
    });
    const mailOptions = {
        from: {
            name: 'Youtube Manager',
            address: process.env.MAIL
        },
        to,
        subject,
        text,
        html,
        attachments: att || []
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(info);
        return info;
    });
}

module.exports = { sendMail }