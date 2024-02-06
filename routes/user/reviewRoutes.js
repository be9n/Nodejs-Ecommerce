const express = require("express");
const auth = require("../../middleware/authentication");
const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../../controllers/user/reviewController");

const router = express.Router();

router.get("/:productId/reviews", getAllReviews);

router.use(auth);

router.post("/:productId/reviews", createReview);
router.put("/reviews/:reviewId", updateReview);
router.delete("/reviews/:reviewId", deleteReview);

module.exports = router;
