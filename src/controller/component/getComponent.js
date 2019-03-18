const ComponentModel = require('../../model/componentModel');

exports.getComponent = async (ctx, next) => {
  const pathParams = ctx.params, // 获取路径参数
    queryParams = ctx.query;

  let data;

  if (queryParams.operate && JSON.parse(queryParams.operate).$lookup) {
    // 连表查询
    data = await ComponentModel.findById(pathParams.id).populate('tag');
  } else {
    data = await ComponentModel.findById(pathParams.id);
  }

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
