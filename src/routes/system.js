const systemController = require('../controller/admin/system/index');
const  { checkLogin, checkIsAdmin }  = require('../middleware/check');

module.exports = function (router) {

  // 获取系统列表
  router.get('/systems', checkLogin, systemController.getSystemList);

  // 获取系统详情
  router.get('/system/:id', checkLogin, checkIsAdmin, systemController.getSystem);

  // 新增系统
  router.post('/system', checkLogin, checkIsAdmin, systemController.createSystem);

  // 更新系统
  router.put('/system/:id', checkLogin, checkIsAdmin, systemController.updateSystem);

  // 删除系统
  router.delete('/system/:id', checkLogin, checkIsAdmin, systemController.deleteSystem);

};
