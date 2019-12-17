const controller = require('../controller/article/index')
const { checkLogin } = require('../middleware/check')
module.exports = function(router) {
  // 全部文章列表  无需登录
  router.get('/articles', controller.getArticles)

  // 用户文章列表
  router.get('/user/articles', checkLogin, controller.getArticlesByUser)

  // 添加
  router.post('/article', checkLogin, controller.createArticle)

  // 爬取
  router.get('/crawl', checkLogin, controller.crawlArticle)

  // 查看
  router.get('/article/:id', controller.getArticle)

  // 更新
  router.put('/article/:id', checkLogin, controller.updateArticle)

  // 删除
  router.delete('/article/:id', checkLogin, controller.deleteArticle)
}
