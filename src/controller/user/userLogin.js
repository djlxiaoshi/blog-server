const UserModel = require('../../model/userModel');
const SystemModel = require('../../model/systemModel');
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
  const params = ctx.request.body;
  const result = await getUserByName(params.username);

  if (result) {
    const menus = await SystemModel.find({
      permission: { $all: [ result.role ]}
    }).populate({
      path: 'menus',
      match: { permission: { $all: [ result.role ] }},
    });

    if (result.password === params.password) {
      ctx.session.user = result;
      ctx.body = {
        code: 0,
        data: {
          avatar: result.avatar,
          info: result.info,
          role: result.role,
          email: result.email,
          username: result.username,
          menus: menus
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
