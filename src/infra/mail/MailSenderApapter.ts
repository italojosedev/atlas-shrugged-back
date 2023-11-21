import { SES } from '@aws-sdk/client-ses';
import { ExternalError } from '@config/errors/ExternalError';
import handlebars from 'handlebars';
import fs from 'fs';
import MailSenderSES from './MailSenderSES';
import MailSenderSMTP from './MailSenderSMTP';
import { IMailAdapter, IMailMessage } from 'src/app/interfaces/MailAdpater';

class MailSenderAdapter {
  private readonly provider: IMailAdapter;
  constructor() {
    switch (process.env.MAIL_PROVIDER) {
      case 'ses':
        this.provider = MailSenderSES;
        break;
      case 'smtp':
        this.provider = MailSenderSMTP;
        break;
      default:
    }
  }

  async sendMail(
    ToAddresses: Array<string>,
    Message: IMailMessage
  ): Promise<void> {
    try {
      await this.provider.sendMail(ToAddresses, Message);
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
      await this.provider.sendMailTemplate(
        template,
        variables,
        ToAddresses,
        subject
      );
    } catch (err) {
      console.log('error ao enviar email', err.message);
    }
  }
}

export default new MailSenderAdapter();
