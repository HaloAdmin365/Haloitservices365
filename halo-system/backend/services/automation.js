const { Notification } = require('../db/models');

const AutomationService = {
  async queueAction(actionType, payload = {}) {
    return Notification.create({
      type: 'automation',
      channel: 'system',
      subject: `Queued automation action: ${actionType}`,
      body: JSON.stringify(payload),
      recipients: [],
      status: 'queued',
      metadata: { actionType, payload },
    });
  },

  async getQueuedActions() {
    return Notification.findAll({
      where: { type: 'automation', status: 'queued' },
      order: [['created_at', 'DESC']],
    });
  },
};

module.exports = AutomationService;
