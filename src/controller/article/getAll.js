const ArticleModel = require('../../model/articleModel')

module.exports = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize

  const result = await Promise.all([
    ArticleModel.countDocuments({
      status: 1 // 发布状态
    }),
    ArticleModel.find(
      {
        status: 1 // 发布状态
      },
      '-content -updateTime'
    )
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
