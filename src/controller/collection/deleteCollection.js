const CollectionModel = require('../../model/collectionModel');

exports.deleteCollection = async (ctx, next) => {

  const params = ctx.params; // 获取路径参数

  // 删除
  const data = await CollectionModel.findOneAndDelete({
      _id: params.id
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
