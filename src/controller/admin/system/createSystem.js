const SystemModel = require('../../../model/systemModel');

exports.createSystem = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  await SystemModel.create({
    label: params.label,
    icon: params.icon,
    permission: params.permission,
    name: params.name,
    createTime: params.createTime
  });

  ctx.body = {
    code: 0,
    message: '系统创建成功'
  };
};
