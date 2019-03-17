const MenuModel = require('../../../model/menuModel');

exports.createMenu = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  await MenuModel.create({
    label: params.label,
    icon: params.icon,
    path: params.path,
    createTime: params.createTime
  });

  ctx.body = {
    code: 0,
    message: '菜单创建成功'
  };
};
