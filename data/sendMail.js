import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '6aa6a414850c28',
        pass: '6a055190e6fbe2'
    }
});

export default transporter;