const ComponentModel = require('../../model/componentModel');

exports.getComponentsListByTag = async (ctx, next) => {
  const params = ctx.query,
    pageSize = parseInt(params.pageSize),
    currentPage = parseInt(params.currentPage),
    skipCount = (currentPage - 1) * pageSize;

  const data = await ComponentModel.find({tag: params.tag});
  console.log(params.tag);
  console.log(data);

  const result = await Promise.all([
    ComponentModel.count({tag: params.tagId}),
    ComponentModel.find({tag: params.tagId}).skip(skipCount).limit(pageSize).populate('tag')
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
