const express = require('express');
const path = require('path');
const hbs = require('hbs');

const travlrRouter = require('./app_server/routes/travlr');
const tripsApi = require('./app_api/routes/trips');


const app = express();

/** View engine: Handlebars */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// app.use('/api/trips', tripsApi);
app.use('/API/trips', tripsApi);

//partials Registration 
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('newDateYear', () => new Date().getFullYear());


/** Routes */
app.use('/', travlrRouter);

// 404 for API
app.use('/API', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 404 for MVC pages
app.use((req, res) => {
  res.status(404).render('index', { layout: 'layouts/layout', title: 'Not Found', message: 'Page not found.' });
});


/** Start server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express (MVC + HBS) running at http://localhost:${PORT}`);
});
