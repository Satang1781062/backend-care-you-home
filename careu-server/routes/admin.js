const express = require("express");
const router = express.Router();
const { createService } = require("../controllers/admin");
router.post("/create-service", createService);

module.exports = router;