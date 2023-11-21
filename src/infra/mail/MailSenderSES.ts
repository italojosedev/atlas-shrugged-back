import { SES } from '@aws-sdk/client-ses';
import { ExternalError } from '@config/errors/ExternalError';
import handlebars from 'handlebars';
import fs from 'fs';
import { IMailAdapter, IMailMessage } from 'src/app/interfaces/MailAdpater';

class MailSenderSES implements IMailAdapter {
  private readonly ses: SES;
  constructor() {
    this.ses = new SES({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });
  }

  async sendMail(
    ToAddresses: Array<string>,
    Message: IMailMessage
  ): Promise<void> {
    try {
      await this.ses.sendEmail({
        Source: process.env.SES_SOURCE,
        Destination: {
          ToAddresses,
        },
        Message: {
          Body: {
            Html: {
              Data: Message?.Html,
            },
            Text: {
              Data: Message?.Text,
            },
          },
          Subject: {
            Data: Message?.Text,
          },
        },
      });
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
    subject: string
  ) {
    try {
      const templateFileContent = await fs.promises.readFile(template, {
        encoding: 'utf-8',
      });

      const parsedTemplate = handlebars.compile(templateFileContent);
      const html = parsedTemplate(variables);
      console.log({
        Source: process.env.SES_SOURCE,
        Destination: {
          ToAddresses,
        },
        Message: {
          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
          Subject: {
            Data: subject,
          },
        },
      });
      await this.ses.sendEmail({
        Source: process.env.SES_SOURCE,
        Destination: {
          ToAddresses,
        },
        Message: {
          Body: {
            Html: {
              Data: html,
              Charset: 'utf-8',
            },
          },
          Subject: {
            Data: subject,
          },
        },
      });
    } catch (err) {
      console.log('error ao enviar email', err.message);
    }
  }
}

export default new MailSenderSES();
