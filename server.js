const express = require('express');
const path = require('path');
const hbs = require('hbs');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const travlrRouter = require('./app_server/routes/travlr');
const tripsApi = require('./app_api/routes/trips');
const authApi = require('./app_api/routes/auth');

const app = express();

/** Parse JSON for POST/PUT bodies */
app.use(express.json());

/** Static assets */
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
hbs.registerHelper('newDateYear', () => new Date().getFullYear());

/** MVC routes (customer site) */
app.use('/', travlrRouter);


app.use('/API/auth', authApi);
app.use('/API/trips', tripsApi);


app.use('/API', (_req, res) => res.status(404).json({ error: 'Not found' }));

/** 404 for MVC pages */
app.use((_req, res) => {
  res
    .status(404)
    .render('index', { layout: 'layouts/layout', title: 'Not Found', message: 'Page not found.' });
});


app.listen(PORT, () => {
  console.log(`Express (MVC + HBS) running at http://localhost:${PORT}`);
});
