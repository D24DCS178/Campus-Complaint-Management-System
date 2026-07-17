const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const config = require("./config");

const routes = require("./routes");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const ApiResponse = require("./utils/apiResponse");

const app = express();

/**
 * ===========================================
 * Global Middlewares
 * ===========================================
 */

app.use(helmet());

app.use(compression());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(loggerMiddleware);

app.use("/api/v1/users", userRoutes);

/**
 * ===========================================
 * API Routes
 * ===========================================
 */

// Main API Routes
app.use("/api/v1", routes);

/**
 * ===========================================
 * Root Route
 * ===========================================
 */

app.get("/", (req, res) => {
  return res.status(200).json(
    ApiResponse.success(
      "Welcome to Campus Complaint Management System API",
      {
        documentation: "/api/v1/health",
        apiBase: "/api/v1",
        version: config.API_VERSION,
      },
      200
    )
  );
});

/**
 * ===========================================
 * 404 Route Handler
 * ===========================================
 */

app.use((req, res) => {
  return res.status(404).json(
    ApiResponse.error("Route not found", 404)
  );
});

/**
 * ===========================================
 * Global Error Handler
 * ===========================================
 */

app.use(errorMiddleware);

module.exports = app;