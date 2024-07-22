import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as nodemailer from 'nodemailer';

@ApiTags('Mail')
@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    /**
       * Configured with Mailtrap
       */
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f12d4cbbb04364', 
      pass: '3182d32fe1c91e', 
    },
  });

  /**
   * Sends a welcome email to a newly registered user.
   * 
   * @param to The email address of the recipient.
   */
  @ApiOperation({ summary: 'Send welcome email' })
  async sendWelcomeEmail(to: string) {
    const mailOptions = {
      from: 'luis.ramon.garcia.v@gmail.com', 
      to,
      subject: 'Welcome to Our Service',
      text: 'Thank you for registering!',
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}: ${info.response}`);
    } catch (error) {
      console.error(`Error sending email to ${to}:`, error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
