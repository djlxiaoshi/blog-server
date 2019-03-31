const CollectionModel = require('../../model/collectionModel');

exports.createCollection = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  const data = await CollectionModel.create({
    name: params.name,
    url: params.url,
    tag: params.tag,
    desc: params.desc,
    createUserId: user._id,
    createTime: params.createTime
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
