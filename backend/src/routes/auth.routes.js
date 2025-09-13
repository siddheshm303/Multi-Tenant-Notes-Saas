const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Tenant = require('../models/Tenant');
const generateToken = require('../utils/generateToken');

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('tenant');

    if (user && (await user.matchPassword(password))) {
      return res.json({
        token: generateToken(user._id, user.tenant._id, user.role),
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          tenant: user.tenant.slug,
          plan: user.tenant.plan,
        },
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
