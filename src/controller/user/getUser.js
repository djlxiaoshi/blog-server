const UserModel = require('../../model/userModel');

/**
 * 通过用户id获取用户信息
 * @param {string} id // 用户id
 * @returns {Promise<*>}
 */
async function getUserById (id) {
  return await UserModel.findOne({'_id': id}, 'username email avatarKey avatar info role juejin jianshu wechat github');
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

exports.getUserById = async (ctx, next) => {
  const pathParams = ctx.params;

  try {
    const user = await getUserById(pathParams.id);

    ctx.body = {
      code: 0,
      data: user,
      message: 'Success'
    };
  } catch (error) {
    ctx.body = {
      code: -500,
      data: {},
      message: error.message
    };
  }
  
};

exports.getAllUsers = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    filter = params.filter ? JSON.parse(params.filter) : {},
    skipCount = (currentPage - 1) * pageSize

  try {
    const [total, users] = await Promise.all([
      UserModel.countDocuments(filter),
      UserModel.find(filter, '-password')
        .skip(skipCount)
        .limit(pageSize)
    ])

    ctx.body = {
      code: 0,
      data: {
        list: users,
        total: total
      },
      message: 'Success'
    };
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: -500,
      data: {},
      message: 'Server Error'
    };
  }
};
