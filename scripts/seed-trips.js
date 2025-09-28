/* Seed Trips from trips.json into MongoDB */
const path = require('path');
const fs = require('fs');
const { connect, mongoose } = require('../app_api/database');
const Trip = require('../app_api/models/trip');

(async () => {
  try {
    await connect();
    const jsonPath = path.join(__dirname, '..', 'trips.json');
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const items = JSON.parse(raw);

    
    const docs = items.map((t, idx) => ({
      ...t,
      code: (t.code || (t.title || 'TRIP').slice(0,3) + (idx+1))
        .replace(/\s+/g,'')
        .toUpperCase()
    }));

   
    for (const d of docs) {
      await Trip.updateOne({ code: d.code }, { $set: d }, { upsert: true });
    }

    const count = await Trip.countDocuments();
    console.log(` Seed complete. Trips in DB: ${count}`);
    process.exit(0);
  } catch (e) {
    console.error('Seed failed:', e);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
