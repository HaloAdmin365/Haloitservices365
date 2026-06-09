const express = require('express');
const { authenticate } = require('../middleware/auth');
const { requirePermission } = require('../middleware/rbac');
const AutomationService = require('../services/automation');
const router = express.Router();

router.get('/queue', authenticate, requirePermission('admin:settings'), async (req, res) => {
  try {
    const actions = await AutomationService.getQueuedActions();
    res.json({ success: true, actions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/queue', authenticate, requirePermission('admin:settings'), async (req, res) => {
  try {
    const { actionType, payload } = req.body;
    if (!actionType) {
      return res.status(400).json({ error: 'actionType is required' });
    }
    const action = await AutomationService.queueAction(actionType, payload || {});
    res.status(201).json({ success: true, action });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
