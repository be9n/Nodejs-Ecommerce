const { StatusCodes } = require("http-status-codes");
const Order = require("../../models/Order");

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
  
  res.status(StatusCodes.OK).json(orders);
};
