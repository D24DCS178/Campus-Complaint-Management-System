const mongoose = require("mongoose");
const config = require("./index");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.MONGO_URI);

    console.log(`
==========================================
🗄️  MongoDB Connected Successfully
==========================================
Host : ${connection.connection.host}
Database : ${connection.connection.name}
==========================================
`);
  } catch (error) {
    console.error(`
==========================================
❌ Database Connection Failed
==========================================
${error.message}
==========================================
`);

    process.exit(1);
  }
};

module.exports = connectDB;