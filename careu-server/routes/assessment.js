// routes/assessmentRoutes.js
const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../Middleware/authMiddleware");
const {
  createOrUpdateAssessment,
  getAssessmentByBooking
} = require("../controllers/assessment");

// provider บันทึกหรือแก้ไขแบบประเมิน
router.post(
  "/assessment/:booking_id",
  auth,
  authorizeRoles("provider"),
  createOrUpdateAssessment
);

// ลูกค้าหรือผู้ดูสามารถดูผลได้
router.get(
  "/assessment/:booking_id",
  auth,
  getAssessmentByBooking
);

module.exports = router;
