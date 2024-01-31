const yup = require("yup");
const schemaValidator = require("../schemaValidator");
const User = require("../../models/User");

async function uniqueEmail(value, context) {
  const user = await User.findOne({ email: value });
  if (user) {
    return this.createError({ message: "Email has been used before" });
  }

  return true;
}

const registerSchema = yup
  .object({
    name: yup.string().required().min(3).max(55),
    email: yup.string().required().email().test("Unique Email", uniqueEmail),
    role: yup.string().oneOf(['buyer']),
    password: yup.string().required().min(6),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Password Confirmation must match"),
  })
  .noUnknown();

module.exports = schemaValidator(registerSchema);
