const userController = require('../controller/user/index');
const { checkLogin, checkNotLogin } = require('../middleware/check');

module.exports = function (router) {

  // 用户登录
  router.post('/login', checkNotLogin, userController.userLogin);
  // 用户登出
  router.get('/logout', checkLogin, userController.userLogout);

  // 获取用户信息
  router.get('/user', checkLogin, userController.getUser);

  // 获取用户信息 (无登录验证)
  router.get('/getUserBy', userController.getUserBy);

  // 创建用户
  router.post('/user', checkNotLogin, userController.createUser);
  // 更新用户信息
  router.put('/user', checkLogin, userController.updateUser);
  // 上传头像
  router.post('/user/avatar', checkLogin, userController.uploadUserAvatar);

  // 上传头像
  router.post('/user/avatar/test', userController.uploadUserAvatarTest)
};
