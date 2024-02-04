const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../../controllers/admin/userController");

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

module.exports = router;
