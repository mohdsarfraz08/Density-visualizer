const mongoose = require('mongoose');

/**
 * Establish a connection to MongoDB using Mongoose.
 * The connection string is read from process.env.MONGODB_URI.
 */
async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('[DB] MONGODB_URI is not set. Skipping database connection.');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true,
    });
    console.log(`[DB] Connected to MongoDB`);
  } catch (error) {
    console.error('[DB] MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };


