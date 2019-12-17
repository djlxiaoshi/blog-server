const ArticleModel = require('../../model/articleModel')

module.exports = async (ctx, next) => {
  const pathParams = ctx.params // 获取路径参数
  const user = ctx.session.user
  const data = await ArticleModel.findById(pathParams.id)
    .populate('createUser', 'username')
    .populate('tags', '_id label')

  // 文章已经发布或者文章属于登陆者本人
  if (data.status === 1 || user._id === data.createUser.id) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    }
  } else {
    ctx.body = {
      code: -1003,
      message: '文章不存在或者未发布',
      data: {}
    }
  }
}
