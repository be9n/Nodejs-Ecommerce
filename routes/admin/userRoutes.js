const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../../controllers/admin/userController");
const auth = require("../../middleware/authentication");
const authorize = require("../../middleware/authorization");

router.use(auth);
router.use(authorize("admin"));

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
