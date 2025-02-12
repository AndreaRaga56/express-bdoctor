import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.SENDMAIL_USER,
        pass: process.env.SENDMAIL_PSW
    }
});

export default transporter;