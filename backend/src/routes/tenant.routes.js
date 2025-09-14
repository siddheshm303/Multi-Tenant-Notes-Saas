const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');

// GET tenant by slug
router.get('/:slug', protect, async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

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

// Invite new user (Admin only)
router.post('/:slug/invite', protect, adminOnly, async (req, res) => {
  try {
    const { email, role } = req.body; // role: 'admin' or 'member'
    const tenant = await Tenant.findOne({ slug: req.params.slug });

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Default password for invited users (could be "password")
    const user = await User.create({
      email,
      password: 'password',
      role,
      tenant: tenant._id,
    });

    res.status(201).json({
      message: 'User invited successfully',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        tenant: tenant.slug,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
