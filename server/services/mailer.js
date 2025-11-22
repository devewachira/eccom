const nodemailer = require('nodemailer');
const template = require('../config/template');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM
} = process.env;

// Create reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: SMTP_SECURE === 'true', // true for 465, false for 587/STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

const prepareTemplate = (type, host, data) => {
  switch (type) {
    case 'reset':
      return template.resetEmail(host, data);
    case 'reset-confirmation':
      return template.confirmResetPasswordEmail();
    case 'signup':
      return template.signupEmail(data);
    case 'merchant-signup':
      return template.merchantSignup(host, data);
    case 'merchant-welcome':
      return template.merchantWelcome(data);
    case 'newsletter-subscription':
      return template.newsletterSubscriptionEmail();
    case 'contact':
      return template.contactEmail();
    case 'merchant-application':
      return template.merchantApplicationEmail();
    case 'merchant-deactivate-account':
      return template.merchantDeactivateAccount();
    case 'order-confirmation':
      return template.orderConfirmationEmail(data);
    default:
      return null;
  }
};

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);
    if (!message) return;

    const mailOptions = {
      from: SMTP_FROM || `ChrisHub <${SMTP_USER}>`,
      to: email,
      subject: message.subject,
      text: message.text
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error.message);
    return error;
  }
};
