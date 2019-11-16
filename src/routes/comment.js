const controller = require('../controller/comment/index');
const  { checkLogin }  = require('../middleware/check');
module.exports = function (router) {

  // 用户文章列表
  router.get('/comments', controller.getComments);

  // 添加
  router.post('/comment', checkLogin, controller.createComment);

};
