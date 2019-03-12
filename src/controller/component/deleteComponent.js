const ComponentModel = require('../../model/componentModel');

exports.deleteComponent = async (ctx, next) => {

  const params = ctx.params; // 获取路径参数

  // 删除文章
  const data = await ComponentModel.findOneAndDelete({
    _id: params.id
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
