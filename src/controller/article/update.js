const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  await ArticleModel.updateOne({_id: pathParams.id}, {
    title: bodyParams.title,
    thumbnail: bodyParams.thumbnail,
    abstract: bodyParams.abstract,
    content: bodyParams.content,
    tag: bodyParams.tag,
    updateTime: Date.now()
  });

  ctx.body = {
    code: 0,
    message: '文章修改成功',
    data: {}
  };
};
