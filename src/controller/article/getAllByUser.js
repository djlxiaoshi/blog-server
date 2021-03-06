const ArticleModel = require('../../model/articleModel')

module.exports = async (ctx, next) => {
  const params = ctx.query,
    user = ctx.session.user,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize,
    matched = {
      createUser: user._id
    }

  // 根据taglist
  if (params.tagId) {
    matched.tag = params.tagId
  }

  const result = await Promise.all([
    ArticleModel.countDocuments(matched),
    ArticleModel.find(matched, '-content ')
      .sort({_id: -1})
      .skip(skipCount)
      .limit(pageSize)
      .populate('tags')
      .populate('createUser')
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
