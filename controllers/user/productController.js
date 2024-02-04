const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/Product");
const CustomError = require("../../errors");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("user");

  res.status(StatusCodes.OK).json({ products });
};

exports.showProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  res.status(StatusCodes.OK).json(product);
};
