const TagModel = require('../../model/tagModel');

module.exports = async (ctx, next) => {
  const pathParams = ctx.params; // 获取路径参数

  let data = await TagModel.findById(pathParams.id);

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
