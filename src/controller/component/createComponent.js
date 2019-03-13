const ComponentModel = require('../../model/componentModel');

exports.createComponent = async (ctx, next) => {
  const params = ctx.request.body;

  const result = await ComponentModel.find({englishName: params.englishName});

  // 判断组件的英文名称是否存在
  if (result.length) {
    ctx.body = {
      code: -2000,
      message: `组件英文名${params.englishName}已存在，请重新填写`,
      data: []
    };
    return;
  }

  const data = await ComponentModel.create({
    chineseName: params.chineseName,
    englishName: params.englishName,
    dependencies: params.dependencies,
    gitlab: params.gitlab,
    tag: params.tag
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
