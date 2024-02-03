const yup = require("yup");
const schemaValidator = require("../schemaValidator");
const { unique } = require("../../utils/validationHelpers");

const makeRegisterSchema = (req) => {
  return yup
    .object({
      name: yup.string().required().min(3).max(55),
      email: yup
        .string()
        .required()
        .email()
        .test({
          message: "This email is used before",
          test: unique({ key: "email", modelName: "User" }),
        }),
      role: yup.string().oneOf(["buyer"]),
      password: yup.string().required().min(6),
      passwordConfirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null], "Password Confirmation must match"),
    })
    .noUnknown();
};

module.exports = schemaValidator(makeRegisterSchema);
