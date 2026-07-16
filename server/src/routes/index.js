const express = require("express");
const router = express.Router();

router.use(require("./healthRoutes"));
router.use(require("./authRoutes"));
router.use(require("./complaintRoutes"));
router.use(require("./adminRoutes"));

module.exports = router;