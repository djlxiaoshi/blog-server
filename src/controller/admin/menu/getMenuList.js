const MenuModel = require('../../../model/menuModel');

exports.getMenuList = async (ctx, next) => {
  const params = ctx.query,
    user = ctx.session.user;

  // fixme 这里有耦合 后期加入系统表
  const data = await MenuModel.find({system: params.system || 'collection'});

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
