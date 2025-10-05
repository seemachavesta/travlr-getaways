const express = require('express');
const router = express.Router();
const { connect } = require('../models/database');


const Trip = require('../models/trip');

// GET /API/trips -> list all trips
router.get('/', async (_req, res) => {
  try {
    await connect();
    const trips = await Trip.find({}).sort({ createdAt: -1 }).lean(); // FIND for collection
    return res.status(200).json(trips);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

// GET /API/trips/:code -> single trip by code
router.get('/:code', async (req, res) => {
  try {
    await connect();
    const code = String(req.params.code || '').trim().toUpperCase();
    if (!code) return res.status(400).json({ error: 'Trip code is required' });

    const trip = await Trip.findOne({ code }).lean(); // FIND ONE for item
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    return res.status(200).json(trip);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

module.exports = router;

