const yup = require("yup");
const schemaValidator = require("../schemaValidator");

const makeReviewSchema = (req) => {
  return yup
    .object({
      rating: yup
        .number()
        .required()
        .min(1, "Rating must be between 1-5")
        .max(5, "Rating must be between 1-5"),
      title: yup.string().required().max(100),
      comment: yup.string().required(),
    })
    .noUnknown();
};

module.exports = schemaValidator(makeReviewSchema);
