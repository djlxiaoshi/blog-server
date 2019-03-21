const menuController = require('../controller/admin/menu/index');
const  { checkLogin, checkIsAdmin }  = require('../middleware/check');

module.exports = function (router) {

  // 获取所有菜单
  router.get('/menus', checkLogin, checkIsAdmin, menuController.getMenuList);

  // 通过系统名获取菜单
  router.get('/getMenusBySystem', checkLogin, menuController.getMenuListBySystem);

  // 获取菜单
  router.get('/menu/:id', checkLogin, checkIsAdmin, menuController.getMenu);

  // 新增菜单
  router.post('/menu', checkLogin, checkIsAdmin, menuController.createMenu);

  // 更新菜单
  router.put('/menu/:id', checkLogin, checkIsAdmin, menuController.updateMenu);

  // 删除菜单
  router.delete('/menu/:id', checkLogin, checkIsAdmin, menuController.deleteMenu);

};
