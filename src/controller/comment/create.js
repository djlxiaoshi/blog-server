const CommentModel = require('../../model/commentModel')
const ArticleModel = require('../../model/articleModel')
const email = require('../../utils/email')
const config = require('../../config/config')

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

    // 如果是回复其他人的评论
    if (bodyParams.replyUser) {
      // TODO
    } else {
      ArticleModel.findOne(
        {
          _id: bodyParams.articleId
        },
        '-content'
      )
        .populate('createUser', 'email')
        .then(article => {
          const createUser = article.createUser
          transportor.sendEmail({
            to: [createUser.email],
            subject: `用户${user.username}评论了您的文章-《${article.title}》`,
            content: `${bodyParams.content}
            详情请查看<a href="${config.host}/article/${article._id}#comment_id_${data._id}">${config.host}/article/${article._id}#comment_id_${data._id}"</a>`
          })
        })
    }

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
  }
}
