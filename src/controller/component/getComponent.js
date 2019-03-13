const ComponentModel = require('../../model/componentModel');

exports.getComponent = async (ctx, next) => {
  const params = ctx.params; // 获取路径参数
  const data = await ComponentModel.findById(params.id).populate('tag');

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
