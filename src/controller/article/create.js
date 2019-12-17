const ArticleModel = require('../../model/articleModel')

// 手动发表文章
module.exports = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    user = ctx.session.user

  const data = await ArticleModel.create({
    ...bodyParams,
    createUser: user._id,
    createTime: Date.now()
  })

  ctx.body = {
    code: 0,
    message: '文章发表成功',
    data: data
  }
}
