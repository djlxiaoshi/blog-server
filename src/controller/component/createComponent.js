const ComponentModel = require('../../model/componentModel');

exports.createComponent = async (ctx, next) => {
  const params = ctx.request.body;
  const data = await ComponentModel.create({
    chineseName: params.chineseName,
    englishName: params.englishName,
    dependencies: params.dependencies,
    gitlab: params.gitlab
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
