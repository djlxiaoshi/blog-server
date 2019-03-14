const UserModel = require('../../model/userModel');

exports.createUser = async (ctx, next) => {
  const params = ctx.request.body;

  await UserModel.create({
    username: params.username,
    password: params.password,
    email: params.email
  });
  ctx.body = {
    code: 0,
    message: '注册成功'
  };
};
