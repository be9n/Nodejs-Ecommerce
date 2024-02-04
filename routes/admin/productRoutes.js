const express = require("express");
const router = express.Router();
const createProductValidation = require("../../validations/products/createProductValidation");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/productController");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("image"),
  createProductValidation,
  createProduct
);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
