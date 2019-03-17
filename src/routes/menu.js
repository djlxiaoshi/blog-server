const menuController = require('../controller/admin/menu/index');
const  { checkLogin }  = require('../middleware/check');

module.exports = function (router) {

  // 获取所有菜单
  router.get('/menus', checkLogin, menuController.getMenuList);

  // 新增菜单
  router.post('/menu', checkLogin, menuController.createMenu);

};
