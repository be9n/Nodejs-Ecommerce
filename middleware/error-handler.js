const { StatusCodes } = require("http-status-codes");
const yup = require("yup");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.message || "Something went wrong try again later",
  };

  if (err instanceof yup.ValidationError) {
    const error = err.inner.reduce((acc, curr) => {
      const key = curr.path;
      const message = curr.message;

      if (!acc[key]) {
        acc[key] = [message];
      } else {
        acc[key].push(message);
      }

      return acc;
    }, {});

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.inner[0].message, errors: error });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).reduce((acc, curr) => {
      acc[curr.path] = curr.message;

      return acc;
    }, {});

    return res.status(StatusCodes.BAD_REQUEST).json({ error: { errors } });
  }

  if (err.code && err.code === 11000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: `Duplicate value entered for ${Object.keys(
        err.keyValue
      )} field, please choose another value`,
    });
  }

  if (err.name === "CastError") {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: `No item found with id : ${err.value}`,
    });
  }

  return res
    .status(customError.statusCode)
    .json({ error: { msg: err.message } });
};

module.exports = errorHandlerMiddleware;
