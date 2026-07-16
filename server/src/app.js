const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const healthRoutes = require("./routes/healthRoutes");
/**
 * ==============================
 * Global Middlewares
 * ==============================
 */

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use("/api/v1/health", healthRoutes);
/**
 * ==============================
 * Default Route
 * ==============================
 */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Campus Complaint Management System API",
        version: "1.0.0"
    });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Campus Complaint Management System API",
    documentation: "/api/v1/health",
  });
});

module.exports = app;