import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eco';

declare global {
  var mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB successfully!');
        return mongoose;
      })
      .catch((error) => {
        console.warn('MongoDB connection failed, falling back to in-memory mode:', error.message);
        cached.promise = null;
        return null;
      });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.conn = null;
  }
  
  return cached.conn;
}

export default dbConnect;
