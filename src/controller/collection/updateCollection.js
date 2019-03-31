const CollectionModel = require('../../model/collectionModel');

exports.updateCollection = async (ctx, next) => {
  const pathParams = ctx.params,
    bodyParams = ctx.request.body;

  const data = await CollectionModel.updateOne({_id: pathParams.id}, {
    name: bodyParams.name,
    desc: bodyParams.desc,
    url: bodyParams.url,
    tag: bodyParams.tag
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
