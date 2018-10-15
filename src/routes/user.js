const userController = require('../controller/user/index');
const { checkLogin, checkNotLogin } = require('../middleware/check');

module.exports = function (router) {

  // 用户登录
  router.post('/login', userController.userLogin);
  // 用户登出
  router.get('/logout', userController.userLogout);

  // 获取用户信息
  router.get('/user', userController.getUser);
  // 创建用户
  router.post('/user', userController.createUser);
  // 更新用户信息
  router.put('/user', userController.updateUser);
};