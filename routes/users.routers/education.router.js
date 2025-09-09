const express = require("express")
const  {
  createEducation,
  getEducations,
  updateEducation,
  deleteEducation,
  getEducationById,
  insertManyEducations,
}=  require( "../../controllers/user.ctrls/education.ctrl");

const router = express.Router();

router.post("/", createEducation);          // create education
router.get("/", getEducations);             // get all education for logged-in user
router.put("/:id", updateEducation);        // update by id
router.delete("/:id", deleteEducation);     // delete by id
router.post("/bulk", insertManyEducations); // insert many
router.get("/:id", getEducationById); // insert many


module.exports = router