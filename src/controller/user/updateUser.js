const UserModel = require('../../model/userModel');
const { getUserByName } = require('./common');

exports.updateUser = async (ctx, next) => {
  const params = ctx.request.body,
    sessionUser = ctx.session.user,
    userMsg = {
      username: params.username,
      info: params.info,
      email: params.email,
      github: params.github,
      wechat: params.wechat,
      jianshu: params.jianshu,
      juejin: params.juejin,
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

  const updatedUser = await UserModel.findByIdAndUpdate(sessionUser._id, userMsg, {new: true, projection: '-password'}); // 返回的是根据条件查找到的文档

  // 更新session
  ctx.session.user = {
    ...ctx.session.user,
    updatedUser
  };

  ctx.body = {
    code: 0,
    data: updatedUser,
    message: 'Success'
  };
};

exports.updateUserByAdmin = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    pathParams = ctx.params;

  try {
    const user = await UserModel.findByIdAndUpdate(pathParams.id, bodyParams, {new: true, projection: '-password'});
    ctx.body = {
      code: 0,
      message: 'Success',
      data: user
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      message: 'Sercer Error',
      data: user
    }
  }

}
