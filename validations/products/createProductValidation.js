const yup = require("yup");
const { unique } = require("../../utils/validationHelpers");
const schemaValidator = require("../schemaValidator");

const makeCreateProductSchema = (req) => {
  return yup
    .object({
      name: yup.string().required().trim().max(100),
      price: yup.number().required().min(10),
      description: yup.string().max(1000),
      category: yup.string().required().oneOf(["office", "kitchen", "bedroom"]),
      company: yup.string().required().oneOf(["ikea", "liddy", "marcos"]),
      colors: yup.array().of(yup.string()),
      featured: yup.boolean(),
      freeShipping: yup.boolean(),
      inventory: yup.number().required(),
      averageRating: yup.number(),
    })
    .noUnknown();
};

module.exports = schemaValidator(makeCreateProductSchema);
