const CollectionModel = require('../../model/collectionModel');

exports.getCollectionList = async (ctx, next) => {
  const params = ctx.query,
    user = ctx.session.user,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize,
    matched = {
      createUserId: user._id,
    };

  // 根据taglist
  if (params.tagId) {
    matched.tag = params.tagId;
  }

  const result = await Promise.all([
    CollectionModel.countDocuments({}),
    CollectionModel.find(matched).skip(skipCount).limit(pageSize).populate('tag')
  ]);

  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      total: result[0],
      list: result[1]
    }
  };
};
