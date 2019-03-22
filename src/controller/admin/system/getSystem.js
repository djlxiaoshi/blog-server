const SystemModel = require('../../../model/systemModel');

exports.getSystem = async (ctx, next) => {
  const pathParams = ctx.params,
    user = ctx.session.user;

  const data = await SystemModel.findOne({
    _id: pathParams.id
  });

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
