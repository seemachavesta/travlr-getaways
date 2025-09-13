const express = require('express');
const path = require('path');
const hbs = require('hbs');

const travlrRouter = require('./app_server/routes/travlr');

const app = express();

/** View engine: Handlebars */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));


//partials Registration 
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('newDateYear', () => new Date().getFullYear());


/** Routes */
app.use('/', travlrRouter);

/** Start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express (MVC + HBS) running at http://localhost:${PORT}`);
});
