const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const notificationService = require('../services/notification');
const router = express.Router();

router.get('/', authenticate, requirePermission('admin:settings'), async (req, res) => {
  try {
    return res.json({ success: true, message: 'Notifications endpoint ready' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post(
  '/send-test',
  authenticate,
  requirePermission('admin:settings'),
  [body('email').isEmail().withMessage('Valid email is required')],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
      const notification = await notificationService.sendSystemNotification({
        subject: 'Halo System Email Test',
        body: 'This is a test email from the Halo system notification service.',
        recipients: [email],
      });
      return res.json({ success: true, notification });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
