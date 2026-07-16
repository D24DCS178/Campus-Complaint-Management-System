const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const validationMiddleware = require("../middleware/validationMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

router.post(
  "/auth/register",
  validationMiddleware(validateRegister),
  authController.register
);

router.post(
  "/auth/login",
  validationMiddleware(validateLogin),
  authController.login
);

router.get(
  "/auth/profile",
  protect,
  authController.getProfile
);

module.exports = router;