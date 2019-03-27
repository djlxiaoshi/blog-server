const UserModel = require('../../model/userModel');
const SystemModel = require('../../model/systemModel');

exports.userCheckLogin = async (ctx, next) => {
  const sessionUser = ctx.session.user;

  if (sessionUser) {

    const menus = await SystemModel.find({ permission: { $all: [sessionUser.role] } }).populate({
      path: 'menus',
      match: { permission: { $all: [ sessionUser.role ] }}
    });

    ctx.body = {
      code: 0,
      data: {
        username: sessionUser.username,
        avatar: sessionUser.avatar,
        email: sessionUser.email,
        info: sessionUser.info,
        role: sessionUser.role,
        menus: menus
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
