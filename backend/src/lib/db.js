import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected! Reconnecting in 3s...");
  setTimeout(connectDB, 3000);
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error event:", err);
});
