const checkPermission = require("../../utils/checkPermission");
const Product = require("../../models/Product");
const Review = require("../../models/Review");
const CustomError = require("../../errors");
const { StatusCodes } = require("http-status-codes");

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate(
    [{ path: "user", select: "name" }]
  );

  res.status(StatusCodes.OK).json(reviews);
};

exports.createReview = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate({
    path: "reviews",
    match: { user: req.user._id },
  });

  if (!product) {
    throw new CustomError.NotFoundError("Product is not found");
  }

  if (product.reviews.length > 0) {
    throw new CustomError.BadRequestError(
      "This user has made a review for this product before!"
    );
  }

  req.body.product = productId;
  req.body.user = req.user._id;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json(review);
};

exports.updateReview = async (req, res) => {
  let review = await Review.findOne({ _id: req.params.reviewId });
  if (!review) {
    throw new CustomError.NotFoundError("Review is not found");
  }

  checkPermission(req.user, review.user);

  Object.assign(review, req.body);
  await review.save();

  res.status(StatusCodes.OK).json(review);
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError("Review is not found");
  }

  checkPermission(req.user, review.user);

  await review.deleteOne();

  res.sendStatus(StatusCodes.OK);
};
