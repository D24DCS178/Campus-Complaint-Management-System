require("dotenv").config();

const config = {
  PORT: process.env.PORT || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  API_VERSION: "v1",

  APP_NAME: "Campus Complaint Management System API",
};

module.exports = config;