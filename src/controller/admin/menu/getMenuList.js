const MenuModel = require('../../../model/menuModel');

exports.getMenuList = async (ctx, next) => {

  const data = await MenuModel.aggregate([
    {
      $group: {
        _id: '$system', menuList: {
          $push: {
            system: '$system',
            label: '$label',
            path: '$path',
            icon: '$icon',
            _id: '$_id'
          }
        }
      }
    }
  ]);

  ctx.body = {
    code: 0,
    message: 'Success',
    data: data
  };
};
