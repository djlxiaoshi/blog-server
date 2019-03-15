const ComponentModel = require('../../model/componentModel');

exports.updateComponent = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  const data = await ComponentModel.updateOne({_id: pathParams.id}, {
    chineseName: bodyParams.chineseName,
    englishName: bodyParams.englishName,
    dependencies: bodyParams.dependencies,
    gitlab: bodyParams.gitlab,
    previewUrl: bodyParams.previewUrl,
    usage: bodyParams.usage,
    tag: bodyParams.tag
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
