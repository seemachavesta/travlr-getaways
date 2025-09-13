const express = require('express');
const router = express.Router();
const ctrlTravlr = require('../controllers/travlr');

// Home page
router.get('/', ctrlTravlr.index);

// Meals route
router.get('/meals', ctrlTravlr.meals);

// Rooms routes
router.get('/rooms', ctrlTravlr.rooms);

// News route
router.get('/news', ctrlTravlr.news);




module.exports = router;
