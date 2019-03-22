const SystemModel = require('../../../model/systemModel');

exports.getSystemList = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  const data = await SystemModel.find({});

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
