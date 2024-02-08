const yup = require("yup");
const schemaValidator = require("../schemaValidator");

const makeOrderValidation = (req) => {
  return yup.object({
    tax: yup.number().required(),
    shippingFee: yup.number().required(),
    items: yup.array().of(
      yup.object().shape({
        quantity: yup.number().required(),
        product: yup.string().required(),
      })
    ).min(1).required('No cart items provided'),
  });
};

module.exports = schemaValidator(makeOrderValidation);
