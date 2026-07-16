const dotenv = require("dotenv");

dotenv.config();

const config = require("./config/index");
const app = require("./app");
const connectDB = require("./config/db");

const PORT = config.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
==========================================
🚀 Server Started Successfully
==========================================
Environment : ${config.NODE_ENV}
Port        : ${PORT}
==========================================
`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();