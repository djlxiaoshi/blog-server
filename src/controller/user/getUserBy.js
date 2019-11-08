const UserModel = require('../../model/userModel');

/**
 * 通过用户名获取用户信息
 * @param {string} username // 用户名
 * @returns {Promise<*>}
 */
async function getUserByName (username) {
  return await UserModel.findOne({'username': username}, 'username email avatarKey info');
}

async function getUserByEmail (email) {
  return await UserModel.findOne({'email': email}, 'username email avatarKey info');
}

async function getUserByUserId (userId) {
  return await UserModel.findOne({'_id': userId}, 'username email avatarKey info');
}

exports.getUserBy = async (ctx, next) => {
  const params = ctx.query;
  let user;

  console.log(params);

  switch (params.getUserMethod) {
    case 'USER_ID': {
      user = await getUserByUserId(params.userMsg);
      break;
    }
    case 'USER_NAME': {
      user = await getUserByName(params.userMsg);
      break;
    }
    case 'USER_EMAIL': {
      user = await getUserByEmail(params.userMsg);
      break;
    }
    default: user = await getUserByName(params.userMsg);
  }



  ctx.body = {
    code: 0,
    data: user,
    message: 'Success'
  };
};
