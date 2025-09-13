const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

// Create Note
router.post('/', protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    const tenant = req.user.tenant;

    // Subscription check: Free plan max 3 notes
    if (tenant.plan === 'free') {
      const noteCount = await Note.countDocuments({ tenant: tenant._id });
      if (noteCount >= 3) {
        return res.status(403).json({ message: 'Upgrade to Pro to add more notes' });
      }
    }

    const note = await Note.create({
      title,
      content,
      tenant: tenant._id,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server error' });
  }
});

// Get all notes for tenant
router.get('/', protect, async (req, res) => {
  const notes = await Note.find({ tenant: req.user.tenant._id });
  res.json(notes);
});

// Get single note
router.get('/:id', protect, async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, tenant: req.user.tenant._id });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// Update note
router.put('/:id', protect, async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, tenant: req.user.tenant._id },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// Delete note
router.delete('/:id', protect, async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    tenant: req.user.tenant._id,
  });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted' });
});

module.exports = router;
