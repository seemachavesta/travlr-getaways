const express = require('express');
const path = require('path');
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;

const travlrRouter = require('./app_server/routes/travlr');
const tripsApi = require('./app_api/routes/trips');


const app = express();

app.use(express.json());

/** View engine: Handlebars */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// app.use('/api/trips', tripsApi);
app.use('/API/trips', tripsApi);
app.use('/API/trips', require('./app_api/routes/trips'));

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



app.listen(PORT, () => {
  console.log(`Express (MVC + HBS) running at http://localhost:${PORT}`);
});

app.listen(3000, () => console.log('Express running at http://localhost:3000'));