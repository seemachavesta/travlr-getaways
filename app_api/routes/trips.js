const express = require('express');
const router = express.Router();
const { connect } = require('../models/database');
const Trip = require('../models/trip');


router.get('/', async (_req, res) => {
  try {
    await connect();
    const trips = await Trip.find({}).sort({ createdAt: -1 }).lean();
    return res.status(200).json(trips);
  } catch (e) {
    console.error('TRIPS API ERROR (LIST):', e);
    return res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// READ (GET /API/trips/:code)
router.get('/:code', async (req, res) => {
  try {
    await connect();
    const code = String(req.params.code || '').toUpperCase();
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    return res.status(200).json(trip);
  } catch (e) {
    console.error('TRIPS API ERROR (GET ONE):', e);
    return res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

// CREATE (POST /API/trips)
router.post('/', async (req, res) => {
  try {
    await connect();
    const payload = req.body || {};
    // basic validation — mongoose will enforce too
    if (!payload.code || !payload.title) {
      return res.status(400).json({ error: 'code and title are required' });
    }
    payload.code = String(payload.code).toUpperCase();

    const created = await Trip.create(payload);
    return res.status(201).json(created);
  } catch (e) {
    console.error('TRIPS API ERROR (CREATE):', e);
    // handle duplicate code
    if (e.code === 11000) return res.status(409).json({ error: 'Trip code already exists' });
    return res.status(500).json({ error: 'Failed to create trip' });
  }
});

// UPDATE (PUT /API/trips/:code)
router.put('/:code', async (req, res) => {
  try {
    await connect();
    const code = String(req.params.code || '').toUpperCase();
    const update = { ...req.body };
    if (update.code) update.code = String(update.code).toUpperCase();

    const updated = await Trip.findOneAndUpdate({ code }, update, { new: true, runValidators: true, lean: true });
    if (!updated) return res.status(404).json({ error: 'Trip not found' });

    return res.status(200).json(updated);
  } catch (e) {
    console.error('TRIPS API ERROR (UPDATE):', e);
    return res.status(500).json({ error: 'Failed to update trip' });
  }
});

// DELETE (DELETE /API/trips/:code)
router.delete('/:code', async (req, res) => {
  try {
    await connect();
    const code = String(req.params.code || '').toUpperCase();
    const result = await Trip.findOneAndDelete({ code });
    if (!result) return res.status(404).json({ error: 'Trip not found' });
    return res.status(204).send();
  } catch (e) {
    console.error('TRIPS API ERROR (DELETE):', e);
    return res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;

