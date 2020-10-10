const ArticleModel = require('../../model/articleModel')

module.exports = async (ctx, next) => {
  const queryParams = ctx.query, // query参数
    user = ctx.session.user,
    pageSize = parseInt(queryParams.pageSize),
    currentPage = parseInt(queryParams.currentPage),
    skipCount = (currentPage - 1) * pageSize,
    matched = { tags: {'$in': [queryParams.tagId]}}

  const result = await Promise.all([
    ArticleModel.countDocuments(matched),
    ArticleModel.find(matched, '-content')
      .sort({_id: -1})
      .skip(skipCount)
      .limit(pageSize)
      .populate('createUser', 'username')
  ])

  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      total: result[0],
      list: result[1]
    }
  }
}
