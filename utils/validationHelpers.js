const unique = ({ key, modelName, ignoreId }) => {
  return async (value, context) => {
    const Model = require(`../models/${modelName}`);
    let query = {
      [key]: value,
    };

    if (ignoreId) {
      query._id = { $ne: ignoreId };
    }

    const item = await Model.findOne(query);

    return !item;
  };
};

module.exports = {
  unique,
};
