const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  const result = await Promise.all([
    ArticleModel.countDocuments({}),
    ArticleModel.find({}, 'title createTime').skip(skipCount).limit(pageSize).populate('tags').populate('createUser', 'username')
  ]);

  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      total: result[0],
      list: result[1]
    }
  };

}