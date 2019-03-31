const controller = require('../controller/collection/index');
const  { checkLogin }  = require('../middleware/check');
module.exports = function (router) {

  // 列表
  router.get('/collections', checkLogin, controller.getCollectionList);

  // 添加
  router.post('/collection', checkLogin, controller.createCollection);

  // 查看
  router.get('/collection/:id', checkLogin, controller.getCollection);

  // 更新
  router.put('/collection/:id', checkLogin, controller.updateCollection);

  // 删除
  router.delete('/collection/:id', checkLogin, controller.deleteCollection);

};
