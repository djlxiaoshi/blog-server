const UserModel = require('../../model/userModel');

exports.userCheckLogin = async (ctx, next) => {
  const sessionUser = ctx.session.user;

  if (sessionUser) {
    ctx.body = {
      code: 0,
      data: {
        username: sessionUser.username,
        info: sessionUser.info,
        avatar: sessionUser.avatar
      },
      message: '用户已登录'
    };
  } else {
    ctx.body = {
      code: -1000,
      data: undefined,
      message: '用户未登录'
    };
  }

};
