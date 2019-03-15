const componentController = require('../controller/component/index');
const  { checkLogin }  = require('../middleware/check');
module.exports = function (router) {

  // 获取所有收藏
  router.get('/components', componentController.getComponentsList);

  // 通过tag名获取组件列表
  router.get('/components/tag', checkLogin, componentController.getComponentsListByTag);

  // 获取指定id收藏
  router.get('/component/:id', checkLogin, componentController.getComponent);

 // 删除指定id的collection
  router.delete('/component/:id', checkLogin, componentController.deleteComponent);

  // 添加收藏
  router.post('/component', checkLogin, componentController.createComponent);

  // 更新收藏
  router.put('/component/:id', checkLogin, componentController.updateComponent);

  router.post('/component/img', checkLogin, componentController.uploadComponentImg);
};
