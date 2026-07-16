const express = require("express");

const config = require("../config");
const ApiResponse = require("../utils/apiResponse");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(
        ApiResponse.success(
            "Health check successful",
            {
                status: "UP",
                service: config.APP_NAME,
                version: config.API_VERSION,
                environment: config.NODE_ENV,
                timestamp: new Date().toISOString(),
            },
            200
        )
    );
});

module.exports = router;