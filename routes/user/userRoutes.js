const express = require("express");
const router = express.Router();

const profileRouter = require("./profileRoutes");
const productRoutes = require("./productRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/products", productRoutes);
router.use("/products", reviewRoutes);

router.use("/profile", profileRouter);

module.exports = router;
