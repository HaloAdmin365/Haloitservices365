const nodemailer = require('nodemailer');
const { Notification, User } = require('../db/models');

const smtpConfig = {
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

function hasSmtpConfig() {
  return Boolean(smtpConfig.host && smtpConfig.auth.user && smtpConfig.auth.pass);
}

function getTransporter() {
  if (!hasSmtpConfig()) {
    return null;
  }
  return nodemailer.createTransport(smtpConfig);
}

async function sendEmail({ to, subject, html, text }) {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error('SMTP configuration is missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD.');
  }

  const message = {
    from: process.env.EMAIL_FROM || 'no-reply@haloitservices365.co.za',
    to,
    subject,
    text: text || html,
    html,
  };

  return transporter.sendMail(message);
}

async function recordNotification(payload) {
  return Notification.create(payload);
}

async function prepareTicketNotification(ticket, event, recipients) {
  const subject = `Halo Ticket ${event}: ${ticket.title}`;
  const text = `Ticket ${event} for '${ticket.title}'.\n\n` +
    `Status: ${ticket.status}\n` +
    `Priority: ${ticket.priority}\n` +
    `Client ID: ${ticket.client_id || 'N/A'}\n` +
    `Assigned Agent ID: ${ticket.assigned_agent_id || 'N/A'}\n` +
    `Link: ${process.env.APP_URL || 'https://haloitservices365.co.za'}/dashboard.html`;

  return {
    type: 'ticket',
    channel: 'email',
    subject,
    body: text,
    recipients,
    status: 'pending',
  };
}

async function sendTicketNotification(ticket, event) {
  const recipients = [];
  if (ticket.assigned_agent_id) {
    const agent = await User.findByPk(ticket.assigned_agent_id);
    if (agent?.email) recipients.push(agent.email);
  }

  if (ticket.created_by) {
    const creator = await User.findByPk(ticket.created_by);
    if (creator?.email && !recipients.includes(creator.email)) recipients.push(creator.email);
  }

  const notificationPayload = await prepareTicketNotification(ticket, event, recipients);
  const notification = await recordNotification(notificationPayload);

  if (recipients.length > 0 && hasSmtpConfig()) {
    try {
      const result = await sendEmail({
        to: recipients.join(','),
        subject: notificationPayload.subject,
        text: notificationPayload.body,
      });
      notification.status = 'sent';
      notification.sent_at = new Date();
      notification.result = result;
      await notification.save();
    } catch (error) {
      notification.status = 'failed';
      notification.failure_reason = error.message;
      await notification.save();
      throw error;
    }
  }

  return notification;
}

async function sendSystemNotification({ subject, body, recipients }) {
  const notification = await recordNotification({
    type: 'system',
    channel: 'email',
    subject,
    body,
    recipients,
    status: 'pending',
  });

  if (!Array.isArray(recipients) || recipients.length === 0) {
    notification.status = 'failed';
    notification.failure_reason = 'No recipients provided';
    await notification.save();
    throw new Error('No recipients provided');
  }

  if (!hasSmtpConfig()) {
    notification.status = 'queued';
    await notification.save();
    return notification;
  }

  try {
    await sendEmail({
      to: recipients.join(','),
      subject,
      text: body,
    });
    notification.status = 'sent';
    notification.sent_at = new Date();
    await notification.save();
  } catch (error) {
    notification.status = 'failed';
    notification.failure_reason = error.message;
    await notification.save();
    throw error;
  }

  return notification;
}

module.exports = {
  sendTicketNotification,
  sendSystemNotification,
  hasSmtpConfig,
};
