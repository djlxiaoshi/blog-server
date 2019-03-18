const ComponentModel = require('../../model/componentModel');

exports.getComponentsList = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  const result = await Promise.all([
    ComponentModel.countDocuments({}),
    ComponentModel.find({}).skip(skipCount).limit(pageSize).populate('tag'),
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 5000)
    })
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
