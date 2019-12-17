const ArticleModel = require('../../model/articleModel')
const axios = require('axios')

module.exports = async (ctx, next) => {
  const queryParams = ctx.query,
    user = ctx.session.user

  const data = await axios.get(queryParams.articleUrl)
  console.log('data', data)

  ctx.body = {
    code: 0,
    message: '文章爬取成功',
    data: data
  }
}
