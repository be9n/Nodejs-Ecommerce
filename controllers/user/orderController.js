const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const fakeStripeApi = async ({ amount, currency }) => {
  const clientSecret = "someRandomValue";

  return { clientSecret, amount };
};

exports.createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new NotFoundError(`No product with id: ${item.product}`);
    }

    if (dbProduct.inventory === 0 || item.quantity > dbProduct.inventory) {
      throw new BadRequestError(
        `There is not enough stock in the inventory for product ${dbProduct._id}`
      );
    }

    const { name, price, _id } = dbProduct;
    const singleOrderItem = {
      quantity: item.quantity,
      name,
      price,
      product: _id,
    };

    orderItems.push(singleOrderItem);
    subtotal += item.quantity * price;
  }

  const total = tax + shippingFee + subtotal;

  const paymentIntent = await fakeStripeApi({
    amount: total,
    currency: "usd",
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.clientSecret,
    user: req.user._id,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(StatusCodes.OK).json(orders);
};

exports.getOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if(!order) {
    throw new NotFoundError('Order is not found')
  }

  res.status(StatusCodes.OK).json(order);
};
