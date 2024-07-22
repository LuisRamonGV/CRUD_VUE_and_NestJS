import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f12d4cbbb04364', // Reemplaza con tu usuario Mailtrap
      pass: '3182d32fe1c91e', // Reemplaza con tu contraseña Mailtrap
    },
  });

  async sendWelcomeEmail(to: string) {
    const mailOptions = {
      from: 'luis.ramon.garcia.v@gmail.com', // Puedes usar cualquier dirección de correo
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
