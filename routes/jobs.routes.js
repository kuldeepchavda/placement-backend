const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.ctrl.js");

// CRUD routes
router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;