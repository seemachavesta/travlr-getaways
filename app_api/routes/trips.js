const express = require('express');
const router = express.Router();
const { connect } = require('../database');
const Trip = require('../models/trip');

// GET /api/trips -> list all trips
router.get('/', async (_req, res) => {
  try {
    await connect();
    const trips = await Trip.find({}).sort({ createdAt: -1 }).lean();
    res.json(trips);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// GET /api/trips/:code -> single trip by code
router.get('/:code', async (req, res) => {
  try {
    await connect();
    const code = String(req.params.code || '').toUpperCase();
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

module.exports = router;
