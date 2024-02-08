const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authentication");
const authorize = require("../../middleware/authorization");

const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const orderRoutes = require("./orderRoutes")

router.use(auth);
router.use(authorize("admin"));

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use('/orders', orderRoutes)

module.exports = router;
