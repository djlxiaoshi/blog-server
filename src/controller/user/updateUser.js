const UserModel = require('../../model/userModel');
const { getUserByName } = require('./common');

exports.updateUser = async (ctx, next) => {
  const params = ctx.request.body,
    sessionUser = ctx.session.user,
    userMsg = {
      username: params.username,
      info: params.info
    };

  // 判断用户名是否已经存在
  if ((params.username !== sessionUser.username)) {
    if (await getUserByName(params.username)) {
      ctx.body = {
        code: -4000,
        data: {},
        message: '该用户名已存在'
      };
      return;
    }

  }

  await UserModel.findByIdAndUpdate(sessionUser._id, userMsg); // 返回的是根据条件查找到的文档

  const updateUser = await UserModel.findById(sessionUser._id, 'username info avatar');

  // 更新session
  ctx.session.user = {
    ...ctx.session.user,
    updateUser
  };

  ctx.body = {
    code: 0,
    data: updateUser,
    message: 'Success'
  };
};
