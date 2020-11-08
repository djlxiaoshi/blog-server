const controller = require('../controller/system/index')
const { checkLogin, checkIsAdmin } = require('../middleware/check')
module.exports = function (router) {
  // 系统配置
  router.get('/adminConfig',checkIsAdmin, controller.getAdminSystemConfig)
 
  // 客户端系统配置
  router.get('/portalConfig', controller.getPortalSystemConfig)

  // 更新系统配置
  router.put('/system', checkLogin, checkIsAdmin, controller.changeSystemConfig)
}
