const unique = ({ modelName, ignoreId }) => {
  return async function (value, context) {
    const Model = require(`../models/${modelName}`);
    let query = {
      [this.path]: value,
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
