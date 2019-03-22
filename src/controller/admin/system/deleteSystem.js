const SystemModel = require('../../../model/systemModel');

exports.deleteSystem = async (ctx, next) => {
  const pathParams = ctx.params,
    user = ctx.session.user;

  await SystemModel.findOneAndDelete({
    _id: pathParams.id
  });

  ctx.body = {
    code: 0,
    message: '系统删除成功'
  };
};
