const TagModel = require('../../model/tagModel');

exports.createTag = async (ctx, next) => {
  const params = ctx.request.body,
    user = ctx.session.user;

  const result = await TagModel.find({label: params.label});

  // 判断组件的英文名称是否存在
  if (result.length) {
    ctx.body = {
      code: -3000,
      message: `组件类别${params.label}已存在，请重新填写`,
      data: []
    };
    return;
  }

  const data = await TagModel.create({
    label: params.label,
    createTime: params.createTime,
    createUserId: user._id
  });

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
