const controller = require('../controller/article/index')
const { checkLogin } = require('../middleware/check')
module.exports = function (router) {
  // 全部文章列表  无需登录
  router.get('/articles', controller.getArticles)

  // 用户文章列表
  router.get('/user/articles', checkLogin, controller.getArticlesByUser)

  // 根据标签获取文章列表
  router.get('/getArticlesByTagId', controller.getArticlesByTagId)

  // 添加
  router.post('/article', checkLogin, controller.createArticle)

  // 爬取
  router.get('/crawl', checkLogin, controller.crawlArticle)

  // 查看一篇文章 （需要登录）
  router.get('/article/getOneByUser', checkLogin, controller.getOneByUser)

  // 查看
  router.get('/article/:id', controller.getOne)

  // 根据用户查询某一篇文章
  router.get('/articleByUser/:id', checkLogin, controller.getOneByUser)

  // 更新
  router.put('/article/:id', checkLogin, controller.updateArticle)

  // 删除
  router.delete('/article/:id', checkLogin, controller.deleteArticle)

  // 处理缩略图
  router.post('/article/thumbnail', checkLogin, controller.uploadThumbnail);
}
