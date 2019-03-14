const UserModel = require('../../model/userModel');

/**
 * 通过用户名获取用户信息
 * @param {string} username // 用户名
 * @returns {Promise<*>}
 */
async function getUserByName (username) {
  return await UserModel.findOne({'username': username}, 'username email avatar info');
}

exports.getUser = async (ctx, next) => {
  const sessionUser = ctx.session.user; // 这里为什么不直接返回，因为session里面存的是用户最基本的，下面返回的是用户详细的信息
  const user = await getUserByName(sessionUser.username);

  ctx.body = {
    code: 0,
    data: user,
    message: 'Success'
  };
};
