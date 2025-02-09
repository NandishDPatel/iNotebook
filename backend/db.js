require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;
const mongoose = require("mongoose");

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.3uz00.mongodb.net/${database}?retryWrites=true&w=majority&authSource=admin`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
};

module.exports = connectToMongo;
