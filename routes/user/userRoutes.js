const express = require("express");
const router = express.Router();

const profileRoutes = require("./profileRoutes");
const productRoutes = require("./productRoutes");
const reviewRoutes = require("./reviewRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/products", productRoutes);
router.use("/products", reviewRoutes);
router.use("/orders", orderRoutes);

router.use("/profile", profileRoutes);

module.exports = router;
