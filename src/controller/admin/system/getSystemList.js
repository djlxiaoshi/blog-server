const SystemModel = require('../../../model/systemModel');

exports.getSystemList = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;
  let match = {};

  if (user.role !== 'admin') {
    match = {
      permission: { $all: [ user.role ]}
    }
  }
  const data = await SystemModel.find(match).populate({
    path: 'menus',
    match: match
  });

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
