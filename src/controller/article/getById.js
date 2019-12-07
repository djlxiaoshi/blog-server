const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx, next) => {
  const pathParams = ctx.params; // 获取路径参数

  let data = await ArticleModel.
  findById(pathParams.id).
  populate('createUser', 'username').
  populate('tags', '_id label');

  if (data.status === 0)  {
    ctx.body = {
      code: -1003,
      message: '文章不存在或者未发布',
      data: {}
    };
  } else {
    ctx.body = {
      code: 0,
      message: 'success',
      data: data
    };
  }
};
