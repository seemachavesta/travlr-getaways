const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    code:        { type: String, required: true, uppercase: true, unique: true }, 
    title:       { type: String, required: true, trim: true },
    duration:    { type: String, required: true },                                 
    price:       { type: Number, required: true, min: 0 },
    description: { type: String, required: true }
  },
  { collection: 'trips', timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('Trip', tripSchema);

