const yup = require("yup");
const schemaValidator = require("../schemaValidator");

const makeUpdatePasswordSchema = (req) => {
  return yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required().min(6),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref("newPassword")], "New Password Confirmation must match")
      .required(),
  });
};

module.exports = schemaValidator(makeUpdatePasswordSchema);
