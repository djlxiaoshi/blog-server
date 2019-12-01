const CommentModel = require('../../model/commentModel');

module.exports = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  const result = await Promise.all([
    CommentModel.countDocuments({
      articleId: params.articleId
    }),
    CommentModel.find({
      articleId: params.articleId
    }).skip(skipCount).limit(pageSize).populate('replyUser createUser')
  ]);

  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      total: result[0],
      current: currentPage,
      list: result[1]
    }
  };
};
