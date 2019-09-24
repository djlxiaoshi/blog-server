const UserModel = require('../../model/userModel');

// todo 做登录状态校验

exports.userLogout = async (ctx, next) => {

  // 清空 session 中用户信息
  ctx.session.user = null;
  ctx.body = {
    code: 0,
    message: '登出成功'
  };
};
