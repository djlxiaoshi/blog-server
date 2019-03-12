const ComponentModel = require('../../model/componentModel');

exports.getAllComponents = async (ctx, next) => {
  const data = await ComponentModel.
  find({});

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
