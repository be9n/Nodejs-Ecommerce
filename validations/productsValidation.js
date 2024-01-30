const yup = require("yup");
const schemaValidator = require("./schemaValidator");

async function uniqueEmail(value, context) {
  // const userId = context.options.context.req.user.id;

  // const user = await User.query().findOne({ email: value });
  // if (user && userId !== user.id) {
  //   return this.createError({ message: "This email has been used before" });
  // }

  if (1 == 1) {
    return this.createError({ message: "This email has been used before" });
  }

  return true;
}

const registerSchema = yup
  .object({
    name: yup.string().required().max(5),
    email: yup
      .string()
      .strict(true)
      .email()
      .required()
      .max(5, "The max is 5 chars")
      .test("Unique Email", uniqueEmail),
    // password: yup.string().strict(true).required().min(6),
  })
  .noUnknown();

module.exports = schemaValidator(registerSchema);
