const CommentModel = require('../../model/commentModel')
const ArticleModel = require('../../model/articleModel')
const email = require('../../utils/email')

const transportor = new email()

module.exports = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    user = ctx.session.user

  try {
    const data = await CommentModel.create({
      content: bodyParams.content,
      createUser: user._id,
      createTime: new Date().getTime(),
      articleId: bodyParams.articleId,
      replyUser: bodyParams.replyUser
    })

    ctx.body = {
      code: 0,
      message: '评论发表成功',
      data: data
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      message: '评论发表成功',
      data: data
    }
  } finally {
    const article = await ArticleModel.findOne(
      {
        _id: bodyParams.articleId
      },
      '-content'
    ).populate('createUser', 'email')

    const createUser = article.createUser
    console.log('article', article)
    transportor.sendEmail({
      to: [createUser.email],
      content: '用户发送了评论'
    })
  }
}
