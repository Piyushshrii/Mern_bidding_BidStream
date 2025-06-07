// sendEmail.js
import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ({ name, email, phone, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT), // 465 for secure
    secure: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_MAIL}>`,
    to: process.env.SMTP_MAIL, // or any other target email address
    subject: `New Contact Form: ${subject}`,
    text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
  };

  await transporter.sendMail(mailOptions);
};
