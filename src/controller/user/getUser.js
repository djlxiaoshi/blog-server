const UserModel = require('../../model/userModel');

/**
 * 通过用户id获取用户信息
 * @param {string} id // 用户id
 * @returns {Promise<*>}
 */
async function getUserById (id) {
  return await UserModel.findOne({'_id': id}, 'username email avatar info');
}

exports.getUser = async (ctx, next) => {
  const sessionUser = ctx.session.user; // 这里为什么不直接返回，因为session里面存的是用户最基本的，下面返回的是用户详细的信息
  const user = await getUserById(sessionUser._id);

  ctx.body = {
    code: 0,
    data: user,
    message: 'Success'
  };
};
