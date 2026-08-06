import mongoose from "mongoose";
import dns from "dns";

// Ensure IPv4 first and fallback DNS for MongoDB Atlas SRV record lookups on Windows/Vercel
try {
  dns.setDefaultResultOrder?.("ipv4first");
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore DNS configuration errors if restricted by platform environment
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Safely masks password in connection string for startup debugging logs
 */
export function maskUri(uri) {
  if (!uri) return "<undefined>";
  return uri.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, "mongodb$1://$2:****@");
}

/**
 * Establishes or returns a cached MongoDB connection using Mongoose.
 * Compatible with Vercel Serverless Functions and traditional Express servers.
 */
export async function connectDB(retries = 3, delayMs = 2000) {
  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    console.error("❌ MONGODB_URI environment variable is missing.");
    throw new Error("MONGODB_URI environment variable is missing.");
  }

  // Reuse existing connection if active
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
    };

    const masked = maskUri(mongodbUri);

    cached.promise = (async () => {
      let lastError;
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          console.log(`[MongoDB] Connecting to ${masked} (Attempt ${attempt}/${retries})...`);
          const conn = await mongoose.connect(mongodbUri, opts);
          console.log(`[MongoDB] ✅ Successfully connected to database: "${conn.connection.name}"`);
          return conn;
        } catch (err) {
          lastError = err;
          console.error(`[MongoDB] ❌ Connection Attempt ${attempt} failed: ${err.message}`);
          
          if (err.message?.includes("bad auth") || err.message?.includes("authentication failed")) {
            console.error(
              "\n=======================================================\n" +
              "⚠️  MongoDB Atlas Authentication Failure:\n" +
              "The credentials in process.env.MONGODB_URI were rejected by MongoDB Atlas.\n\n" +
              "Please perform the following steps in MongoDB Atlas (https://cloud.mongodb.com):\n" +
              " 1. Go to 'Security' -> 'Database Access':\n" +
              "    - Verify user 'shubhamsingh15032004_db_user' exists.\n" +
              "    - Edit Password -> Set to '2IELACBUrCJE7JAU'.\n" +
              "    - Ensure Built-in Role is 'Read and write to any database'.\n" +
              " 2. Go to 'Security' -> 'Network Access':\n" +
              "    - Add IP Address '0.0.0.0/0' (Allow access from anywhere).\n" +
              "=======================================================\n"
            );
            break; // Stop retrying on permanent authentication errors
          }

          if (attempt < retries) {
            console.log(`[MongoDB] Retrying connection in ${delayMs / 1000}s...`);
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
        }
      }
      cached.promise = null;
      throw lastError;
    })();
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

export default connectDB;
