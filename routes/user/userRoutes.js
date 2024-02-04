const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authentication");

const profileRouter = require("./profileRoutes");
const productRoutes = require("./productRoutes");

router.use("/products", productRoutes);

router.use(auth);

router.use("/profile", profileRouter);

module.exports = router;
