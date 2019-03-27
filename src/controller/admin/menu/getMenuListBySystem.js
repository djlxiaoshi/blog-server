const MenuModel = require('../../../model/menuModel');

exports.getMenuListBySystem = async (ctx, next) => {
  const queryParams = ctx.query,
    user =  ctx.session.user;

  console.log(user);
  const data = await MenuModel.find({
    system: queryParams.systemId, // 默认为收藏系统
    permission :{ $all:[user.role] }
  });

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
