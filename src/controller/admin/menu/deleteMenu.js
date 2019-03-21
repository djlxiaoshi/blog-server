const MenuModel = require('../../../model/menuModel');

exports.deleteMenu = async (ctx, next) => {
  const params = ctx.params;

  await MenuModel.findOneAndDelete({
    _id: params.id
  });

  ctx.body = {
    code: 0,
    message: '菜单删除成功'
  };
};
