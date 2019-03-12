const ComponentModel = require('../../model/componentModel');

exports.updateComponent = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  const data = await ComponentModel.update({_id: pathParams.id}, {
    chineseName: bodyParams.chineseName,
    englishName: bodyParams.englishName,
    dependencies: bodyParams.dependencies,
    gitlab: bodyParams.gitlab
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
