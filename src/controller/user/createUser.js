const UserModel = require('../../model/userModel');

exports.createUser = async (ctx, next) => {
  const params = ctx.request.body;
  // role 0：管理员 1：普通用户
  await UserModel.create({
    username: params.username,
    password: params.password,
    email: params.email,
    role: 1
  });
  ctx.body = {
    code: 0,
    message: '注册成功'
  };
};
