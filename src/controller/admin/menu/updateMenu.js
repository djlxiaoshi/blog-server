const MenuModel = require('../../../model/menuModel');

exports.updateMenu = async (ctx, next) => {
  const bodyParams = ctx.request.body,
    pathParams = ctx.params;

  await MenuModel.updateOne({ _id: pathParams.id }, {
    label: bodyParams.label,
    icon: bodyParams.icon,
    path: bodyParams.path,
    system: bodyParams.system
  });

  ctx.body = {
    code: 0,
    message: '菜单更新成功'
  };
};
