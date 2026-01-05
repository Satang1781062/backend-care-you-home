const express = require("express");
const router = express.Router();
const { auth, authorizeRoles } = require("../Middleware/authMiddleware");

const {
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require("../controllers/service");


router.get("/service", getServices);


router.get("/service/:id", getServiceById);





router.put("/service/:id", auth, authorizeRoles("admin"), updateService);


router.delete("/service/:id", auth, authorizeRoles("admin"), deleteService);

module.exports = router;
