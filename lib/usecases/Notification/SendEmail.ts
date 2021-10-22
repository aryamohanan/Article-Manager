import { Configurations } from 'config';
import nodemailer = require('nodemailer');

export class SendMail{
    static async call(subject, text) {
        const from = 'articles.dev@gmail.com'
        const to = 'author@gmail.com'
        const transporter = nodemailer.createTransport(Configurations.smtpConnections);
        await transporter.sendMail({ from, to, subject, text });
    }
}

