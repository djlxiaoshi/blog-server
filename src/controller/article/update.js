const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  await ArticleModel.updateOne({_id: pathParams.id}, {
    ...bodyParams,
    updateTime: Date.now()
  });

  ctx.body = {
    code: 0,
    message: '文章修改成功',
    data: {}
  };
};
