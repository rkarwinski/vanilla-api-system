import { IMailProvider, IMessage } from "../I-mail-provider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "adc65d9e1745a6",
                pass: "e6ad181def1b4c"
            }
        }); 
    }
    
    async sendMail(message: IMessage) {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address:  message.to.email,
            },
            from: {
                name: message.from.name,
                address:  message.from.email,
            },
            subject: message.subject,
            html: message.body,
        });
    }
}