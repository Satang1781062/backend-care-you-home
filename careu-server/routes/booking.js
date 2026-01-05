const express = require("express");
const router = express.Router();

const { auth, authorizeRoles } = require("../Middleware/authMiddleware");

//customer
const { createBooking, subnitReview,  getMyBookings, getBookingDetail} = require("../controllers/booking");
router.post("/booking/create", auth, authorizeRoles("customer"), createBooking);
router.get("/booking/my", auth, authorizeRoles("customer"), getMyBookings);
router.get("/booking/:id", auth, authorizeRoles("customer"), getBookingDetail);
router.post("/booking/review", auth, authorizeRoles("customer"), subnitReview);


//provider
const { getPendingBookings, acceptBooking, setProviderLocation, getMyAcceptedJobs, getProviderJobDetail,updateJobStatus, startJob, finishJob, cancelJob } = require("../controllers/booking")



router.get("/pending", auth, authorizeRoles("provider"), getPendingBookings);
router.put("/accept/:id", auth, authorizeRoles("provider"), acceptBooking);
router.put("/provider/set-location", auth, authorizeRoles("provider"), setProviderLocation);
router.get("/my-jobs", auth, authorizeRoles("provider"), getMyAcceptedJobs);
router.get("/job/:id", auth, authorizeRoles("provider"), getProviderJobDetail);
router.put("/job/:id/status", auth, authorizeRoles("provider"), updateJobStatus);

//status job: pending, accepted, in_progress, completed, cancelled
router.put("/status-job/:id/start", auth, authorizeRoles("provider"), startJob);
router.put("/status-job/:id/finish", auth, authorizeRoles("provider"), finishJob);
router.put("/status-job/:id/cancel", auth, authorizeRoles("provider"), cancelJob);



module.exports = router;