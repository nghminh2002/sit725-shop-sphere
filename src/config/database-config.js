const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URI;

    if (!mongoUrl) {
      throw new Error("MongoDB URI is not defined");
    }
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
