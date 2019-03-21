const MenuModel = require('../../../model/menuModel');

exports.getMenuListBySystem = async (ctx, next) => {
  const queryParams = ctx.query;
  const data = await MenuModel.find({
    system: queryParams.system || 'collection' // 默认为收藏系统
  });

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
