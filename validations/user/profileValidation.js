const yup = require("yup");
const schemaValidator = require("../schemaValidator");
const { unique } = require("../../utils/validationHelpers");

const makeProfileValidation = (req) => {
  return yup
    .object({
      name: yup.string().required().min(3).max(50),
      email: yup
        .string()
        .email()
        .required()
        .test({
          message: "This email is used before",
          test: unique({
            key: 'email',
            modelName: "User",
            ignoreId: req.user._id,
          }),
        }),
    })
    .noUnknown();
};

module.exports = schemaValidator(makeProfileValidation);
