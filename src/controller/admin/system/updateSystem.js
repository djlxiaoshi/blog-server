const SystemModel = require('../../../model/systemModel');

exports.updateSystem = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    pathParams = ctx.params,
    user = ctx.session.user;

  await SystemModel.updateOne({ _id: pathParams.id }, {
    label: bodyParams.label,
    icon: bodyParams.icon,
    name: bodyParams.name,
    permission: bodyParams.permission
  });

  ctx.body = {
    code: 0,
    message: '系统更新成功'
  };
};
