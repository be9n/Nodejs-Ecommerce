const yup = require("yup");
const schemaValidator = require("../schemaValidator");

const makeLoginSchema = (req) => {
  return yup
    .object({
      email: yup.string().required("Please provide email and password"),
      password: yup.string().required("Please provide email and password"),
    })
    .noUnknown();
};

module.exports = schemaValidator(makeLoginSchema);
