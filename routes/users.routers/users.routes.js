const express = require("express");

const {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  insertManyUsers,
} = require("../../controllers/user.ctrls/user.ctrl.js");

const router = express.Router();

router.get("/me", getUser);           // get current user (req.user._id)
router.get("/", getAllUsers);         // get all users
router.put("/me", updateUser);        // update current user
router.delete("/me", deleteUser);     // delete current user

module.exports = router;
