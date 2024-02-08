const express = require("express");
const auth = require("../../middleware/authentication");
const reviewValidation = require('../../validations/user/reviewValidation')
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../../controllers/user/reviewController");

const router = express.Router();

router.get("/:productId/reviews", getAllReviews);

router.use(auth);

router.post("/:productId/reviews", reviewValidation, createReview);
router.put("/reviews/:reviewId", reviewValidation, updateReview);
router.delete("/reviews/:reviewId", deleteReview);

module.exports = router;
