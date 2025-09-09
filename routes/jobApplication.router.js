const router = require("express").Router()
const JobApplicationCTRLs = require("../controllers/jobApplication.ctrl")

router.route("/").post(JobApplicationCTRLs.applyForJob)
router.route("/").get(JobApplicationCTRLs.getApplies);
router.route("/undo").post(JobApplicationCTRLs.undoApplication)

router.route("/admin/update/status").post(JobApplicationCTRLs.updateApplicationStatus);
router.route("/admin").get(JobApplicationCTRLs.getApplications);
module.exports = router;