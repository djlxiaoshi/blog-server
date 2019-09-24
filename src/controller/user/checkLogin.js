exports.userCheckLogin = async (ctx, next) => {
  const sessionUser = ctx.session.user;

  if (sessionUser) {

    ctx.body = {
      code: 0,
      data: {
        username: sessionUser.username,
        avatar: sessionUser.avatar,
        email: sessionUser.email,
        info: sessionUser.info,
        role: sessionUser.role,
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
