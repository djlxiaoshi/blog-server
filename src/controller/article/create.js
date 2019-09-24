const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    user = ctx.session.user;

  const data = await ArticleModel.create({
    title: bodyParams.title,
    content: bodyParams.content,
    abstract: bodyParams.abstract,
    thumbnail: bodyParams.thumbnail,
    tag: bodyParams.tag,
    createUser: user._id,
    createTime: Date.now()
  });

  ctx.body = {
    code: 0,
    message: '文章发表成功',
    data: data
  };
};
