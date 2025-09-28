
//onst tripsData = require('../../trips.json');
const { connect } = require('../../app_api/database');
const Trip = require('../../app_api/models/trip');


// Controller for public pages


const index = (req, res) => {
  res.render('index', {
    layout: 'layouts/layout',
    title: 'Travlr Getaways',
    message: 'Welcome to Travlr — now rendered with Handlebars!'
  });
};



// Controller for meals page
const meals = (req, res) => {
  
  const specials = [
    { name: 'Island Breakfast', price: 14.99, description: 'Fresh fruit, local pastries, Kona coffee' },
    { name: 'Seaside Lunch',   price: 22.50, description: 'Grilled mahi with citrus slaw' },
    { name: 'Sunset Dinner',   price: 34.00, description: 'Steak & shrimp, garlic mash, garden salad' }
  ];
  res.render('meals', {
    layout: 'layouts/layout',
    title: 'Travlr Getaways — Meals',
    specials
  });
};



const rooms = (req, res) => {
  const rooms = [
    { name: 'Ocean View Suite',   beds: 2, price: 289, perks: ['Balcony','Mini-bar','Wi-Fi'] },
    { name: 'Garden Bungalow',    beds: 1, price: 169, perks: ['Patio','Hammock','Wi-Fi'] },
    { name: 'Family Villa',       beds: 4, price: 389, perks: ['Kitchen','Pool','Wi-Fi'] }
  ];
  res.render('rooms', {
    layout: 'layouts/layout',
    title: 'Travlr Getaways — Rooms',
    rooms
  });
};


const news = (req, res) => {
  const items = [
    { title: 'Fall getaway deals announced', date: '2025-09-01', summary: 'Save up to 25% on select islands.' },
    { title: 'New villa openings',          date: '2025-08-18', summary: 'Family villas now available with private pools.' },
    { title: 'Traveler tips update',        date: '2025-08-05', summary: 'What to pack for shoulder season travel.' }
  ];
  res.render('news', {
    layout: 'layouts/layout',
    title: 'Travlr Getaways — News',
    items
  });
};


// const trips = (req, res) => {
//   res.render('trips', {
//     layout: 'layouts/layout',
//     title: 'Travlr Getaways — Trips',
//     trips: tripsData
//   });
// };


const trips = async (req, res) => {
  await connect();
  const trips = await Trip.find({}).sort({ createdAt: -1 }).lean();
  res.render('trips', {
    layout: 'layouts/layout',
    title: 'Travlr Getaways — Trips',
    trips
  });
};


module.exports = { index, meals, rooms, news, trips };



