const express = require('express');
const path = require('path');
const app = express();


app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

//  test routes
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
app.get('/api/echo', (req, res) => {
  res.json({ query: req.query });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express running at http://localhost:${PORT}`);
});
