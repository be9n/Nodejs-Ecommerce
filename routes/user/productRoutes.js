const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  showProduct,
} = require("../../controllers/user/productController");

router.get("/", getAllProducts);
router.get("/:id", showProduct);

module.exports = router;
