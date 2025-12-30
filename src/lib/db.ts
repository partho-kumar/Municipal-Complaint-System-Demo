import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
}

// Type for our cached connection
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the global object to store cache
declare global {
    var mongooseCache: MongooseCache | undefined;
}

// Initialize cache if it doesn't exist
const cached: MongooseCache = global.mongooseCache ?? {
    conn: null,
    promise: null,
};

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!, {
            bufferCommands: false,
        });
    }

    cached.conn = await cached.promise;

    // Save cache to global (dev hot reload safe)
    global.mongooseCache = cached;

    return cached.conn;
}
