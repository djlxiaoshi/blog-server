const TagModel = require('../../model/tagModel');

module.exports = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  const data = await TagModel.updateOne({_id: pathParams.id}, {
    label: bodyParams.label
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
