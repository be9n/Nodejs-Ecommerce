module.exports = (schemaMaker) => async (req, res, next) => {
  const schema = schemaMaker(req);

  const validated = await schema.validate(req.body, {
    abortEarly: false,
  });

  req.body = validated;

  return next();
};
