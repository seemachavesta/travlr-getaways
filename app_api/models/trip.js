const { mongoose } = require('../database');

const TripSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    code:        { type: String, required: true, uppercase: true, unique: true }, // e.g., HAW7D
    price:       { type: Number, required: true, min: 0 },
    duration:    { type: String, required: true },                                 // e.g., "7 nights"
    description: { type: String, required: true }
  },
  { collection: 'trips', timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('Trip', TripSchema);
