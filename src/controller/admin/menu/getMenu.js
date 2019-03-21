const MenuModel = require('../../../model/menuModel');

exports.getMenu = async (ctx, next) => {
  const params = ctx.params;

  const data = await MenuModel.findOne({
   _id: params.id
  });

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
