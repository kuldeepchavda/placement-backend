const express  = require("express");

const  {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
  insertManyExperiences,
  getExperiencesById
} = require( "../../controllers/user.ctrls/experience.ctrl");

const router = express.Router();

router.post("/", createExperience);          // create experience
router.get("/", getExperiences);             // get all experiences of logged-in user
router.get("/:id", getExperiencesById);             // get all experiences of logged-in user
router.put("/:id", updateExperience);        // update by experience id
router.delete("/:id", deleteExperience);     // delete by experience id
router.post("/bulk", insertManyExperiences); // insert many at once
module.exports = router