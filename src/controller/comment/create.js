const CommentModel = require('../../model/commentModel');

module.exports = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    user = ctx.session.user;

  const data = await CommentModel.create({
    content: bodyParams.content,
    createUser: user._id,
    createTime: Date.now(),
    articleId: bodyParams.articleId,
    replyUser: bodyParams.replyUser
  });

  ctx.body = {
    code: 0,
    message: '评论发表成功',
    data: data
  };
};
