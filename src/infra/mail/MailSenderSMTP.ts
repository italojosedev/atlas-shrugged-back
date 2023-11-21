import { ExternalError } from '@config/errors/ExternalError';
import handlebars from 'handlebars';
import fs from 'fs';
import { IMailAdapter, IMailMessage } from 'src/app/interfaces/MailAdpater';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MailSenderSES implements IMailAdapter {
  private transporter: any;
  constructor() {}

  async connect(): Promise<
    nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  > {
    const transporter = await nodemailer.createTransport({
      /** @ts-ignore */
      host: process.env.SMTP_HOST || 'localhost',
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_USER_PASSWORD,
      },
      logger: true,
    });

    return transporter;
  }

  async sendMail(
    ToAddresses: Array<string>,
    Message: IMailMessage
  ): Promise<void> {
    try {
      let message = {
        from: process.env.MAIL_SENDER, // listed in rfc822 message header
        to: ToAddresses, // listed in rfc822 message header
        envelope: {
          from: `CotaByte <${process.env.MAIL_SENDER}>`, // used as MAIL FROM: address for SMTP
          to: ToAddresses?.[0], // used as RCPT TO: address for SMTP
        },
        html: Message?.Html,
        text: Message?.Text,
        subject: Message?.Subject,
      };
      await this.transporter.sendMail(message);
    } catch (error) {
      throw new ExternalError(502, {
        message: "AWS SES couldn't send the E-Mail",
      });
    }
  }
  async sendMailTemplate(
    template: any,
    variables: object,
    ToAddresses: string[],
    subject: string,
    attachments?: any[]
  ) {
    try {
      const transporter = await this.connect();
      const templateFileContent = await fs.promises.readFile(template, {
        encoding: 'utf-8',
      });

      const parsedTemplate = handlebars.compile(templateFileContent);
      const html = parsedTemplate(variables);
      let message = {
        from: process.env.MAIL_SENDER, // listed in rfc822 message header
        to: ToAddresses, // listed in rfc822 message header
        envelope: {
          from: `CotaByte <${process.env.MAIL_SENDER}>`, // used as MAIL FROM: address for SMTP
          to: ToAddresses?.[0], // used as RCPT TO: address for SMTP
        },
        html: html,
        subject: subject,
        attachments: attachments,
      };
      if (transporter.verify()) {
        const info = await transporter.sendMail(message);
        console.log('Message sent: %s', info.response);
      }
    } catch (err) {
      console.log('error ao enviar email', err.message);
    }
  }
}

export default new MailSenderSES();
