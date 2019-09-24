const UserModel = require('../../model/userModel');
/**
 * 通过用户名获取用户信息
 * @param {string} username // 用户名
 * @returns {Promise<*>}
 */
async function getUserByName (username) {
  return await UserModel.findOne({'username': username});
}

// todo 寻找错误码相关的规范

exports.userLogin = async (ctx, next) => {
  const bodyParams = ctx.request.body;
  const user = await getUserByName(bodyParams.username);

  if (user) {

    if (user.password === bodyParams.password) {
      // 保存用户session信息
      ctx.session.user = user;

      ctx.body = {
        code: 0,
        data: {
          avatar: user.avatar,
          info: user.info,
          role: user.role,
          email: user.email,
          username: user.username
        },
        message: '登录成功'
      };
    } else {
      ctx.body = {
        code: -3700,
        message: '密码不正确'
      };
    }
  } else {
  //  todo 用户登录异常处理
    ctx.body = {
      code: -3701,
      message: '用户名不正确'
    };
  }
};
