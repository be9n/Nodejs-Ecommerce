const express = require("express");
const router = express.Router();
const { getAllOrders } = require("../../controllers/admin/orderController");

router.get("/", getAllOrders);

module.exports = router;
