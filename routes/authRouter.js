const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const registerValidation = require("../validations/auth/registerValidation");
const loginValidation = require("../validations/auth/loginValidation");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/logout", logout);

module.exports = router;
