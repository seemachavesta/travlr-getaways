const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

mongoose.set('strictQuery', true);

mongoose.connection.on('connected', () => console.log(`✅ MongoDB connected: ${uri}`));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err.message));
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected'));

const connect = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(uri, { autoIndex: true });
  return mongoose.connection;
};

module.exports = { mongoose, connect };

