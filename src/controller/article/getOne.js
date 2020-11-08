const ArticleModel = require('../../model/articleModel')

exports.getOneByUser = async function (ctx, next) {
  const queryParams = ctx.query // 获取路径参数
  const user = ctx.session.user

  const data = await ArticleModel.findOne({
    _id: queryParams.id,
    createUser: user._id
  })
    .populate('createUser', 'username')
    .populate('tags', '_id label')

  if (data) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    }
  } else {
    ctx.body = {
      code: -1004,
      message: '文章不存在',
      data: {}
    }
  }

}

exports.getById = async function (ctx, next) {
  const pathParams = ctx.params // 获取路径参数
  try {
    const data = await ArticleModel.findOne({
      _id: pathParams.id,
      status: 1
    })
    .populate('createUser', 'username')
    .populate('tags', '_id label')

  if (data) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    }
  } else {
    ctx.body = {
      code: -1003,
      message: '文章不存在',
      data: {}
    }
  }
  } catch (error) {
    ctx.body = {
      code: -1003,
      message: '文章不存在',
      data: {}
    }
  }
  
}
