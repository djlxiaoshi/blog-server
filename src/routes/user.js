const userController = require('../controller/user/index');
const { checkLogin, checkNotLogin, checkIsAdmin } = require('../middleware/check');

module.exports = function (router) {

  // 用户登录
  router.post('/login', userController.userLogin);
  // 用户登出
  router.get('/logout', checkLogin, userController.userLogout);

  // 获取用户信息
  router.get('/user', checkLogin, userController.getUser);

  router.get('/getUserById/:id', checkLogin, userController.getUserById);

  // 获取用户信息
  router.get('/allUsers', checkLogin, checkIsAdmin, userController.getAllUsers);

  // 获取用户信息 (无登录验证)
  router.get('/getUserBy', userController.getUserBy);

  // 创建用户
  router.post('/user', checkNotLogin, userController.createUser);

  // 管理员创建用户
  router.post('/addUserByAdmin', checkIsAdmin, userController.createUserByAdmin);
  // 更新用户信息
  router.put('/user', checkLogin, userController.updateUser);

  router.put('/updateUserById/:id', checkLogin, userController.updateUser);

  // 管理员更新用户信息
  router.put('/updateUserByAdmin/:id', checkLogin, checkIsAdmin, userController.updateUserByAdmin);
  // 上传头像
  router.post('/user/avatar', checkLogin, userController.uploadUserAvatar);

  // 上传头像
  router.post('/user/avatar/test', userController.uploadUserAvatarTest);

};
