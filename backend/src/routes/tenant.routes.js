const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { protect, adminOnly } = require('../middleware/auth');

// Upgrade subscription
router.post('/:slug/upgrade', protect, adminOnly, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    tenant.plan = 'pro';
    await tenant.save();

    res.json({ message: `${tenant.name} upgraded to Pro`, plan: tenant.plan });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
