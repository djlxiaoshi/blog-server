const TagModel = require('../../model/tagModel');
const ArticleModel = require('../../model/articleModel');

exports.getAll = async (ctx, next) => {

  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  if (pageSize && currentPage) {
    const result = await Promise.all([
      TagModel.countDocuments({}),
      TagModel.find({}).skip(skipCount).limit(pageSize).populate('createUser')
    ]);

    ctx.body = {
      code: 0,
      message: 'success',
      data: {
        total: result[0],
        list: result[1]
      }
    };
  } else {
    const data = await TagModel.find({});


    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    };
  }
};
