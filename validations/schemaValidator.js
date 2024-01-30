module.exports = (schema) => async (req, res, next) => {
  const validated = await schema.validate(req.body, {
    context: { req },
    abortEarly: false,
  });

  req.body = validated;

  return next();
};
