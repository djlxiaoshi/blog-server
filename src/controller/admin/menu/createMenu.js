const MenuModel = require('../../../model/menuModel');
const SystemModel = require('../../../model/systemModel');

exports.createMenu = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  const menuData = await MenuModel.create({
    label: params.label,
    icon: params.icon,
    path: params.path,
    system: params.system,
    permission: params.permission,
    createTime: params.createTime
  });

  const systemData = await SystemModel.findOne({
    _id: params.system
  });
  systemData.menus.push(menuData._id);
  systemData.save();

  ctx.body = {
    code: 0,
    message: '菜单创建成功'
  };
};
