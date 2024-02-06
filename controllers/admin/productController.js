const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/Product");
const s3Service = require("../../utils/s3Service");
const CustomError = require("../../errors");

exports.createProduct = async (req, res) => {
  if (req.file) {
    let image = await s3Service.uploadFile(req.file);
    req.body.image = image.Location;
  }

  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json(product);
};

exports.updateProduct = async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  if (req.file) {
    if (product.image) {
      s3Service.deleteFile(product.getImagePath());
    }

    let image = await s3Service.uploadFile(req.file);
    req.body.image = image.Location;
  }

  Object.assign(product, req.body);
  await product.save();

  res.status(StatusCodes.OK).json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError("Product not found");
  }

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ success: true });
};
