const componentController = require('../controller/component/index');
const  { checkLogin }  = require('../middleware/check');
module.exports = function (router) {

  // 获取所有收藏
  router.get('/components', componentController.getAllComponents);

  // 获取指定id收藏
  router.get('/component/:id', componentController.getComponent);

 // 删除指定id的collection
  router.delete('/component/:id', componentController.deleteComponent);

  // 添加收藏
  router.post('/component', componentController.createComponent);

  // 更新收藏
  router.put('/component/:id', componentController.updateComponent);

  router.post('/component/img', componentController.uploadComponentImg);
};
