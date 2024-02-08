const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authentication");
const orderValidation = require("../../validations/user/orderValidation");
const {
  getUserOrders,
  createOrder,
  getOrder,
} = require("../../controllers/user/orderController");

router.use(auth);
router.get("/", getUserOrders);
router.post("/", orderValidation, createOrder);
router.get("/:id", getOrder);

module.exports = router;
