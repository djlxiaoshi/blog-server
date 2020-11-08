const UserModel = require('../../model/userModel');
const { sha256 } =require('js-sha256');

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

exports.createUserByAdmin = async (ctx, next) => {
  const params = ctx.request.body;
  try {
    // role 0：管理员 1：普通用户
    await UserModel.create({
      username: params.username,
      password: sha256('123456'),
      role: 1
    });
    ctx.body = {
      code: 0,
      message: '注册成功'
    };
  } catch (error) {
    ctx.body = {
      code: -500,
      data: {},
      message: error.message,
    };
  }
  
};
