const mongoose = require("mongoose");

const connectDB = async (url) => {
  console.log("Connected");
  return mongoose.connect(url);
};

module.exports = connectDB;
