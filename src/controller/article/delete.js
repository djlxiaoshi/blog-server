const ArticleModel = require('../../model/articleModel');

module.exports = async (ctx, next) => {

  const params = ctx.params; // 获取路径参数

  // 删除
  const data = await ArticleModel.findOneAndDelete({
      _id: params.id
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
