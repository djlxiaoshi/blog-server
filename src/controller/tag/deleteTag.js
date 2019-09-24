const TagModel = require('../../model/tagModel');
const CollectionModel = require('../../model/articleModel');

exports.deleteTag = async (ctx, next) => {
  const params = ctx.params;

  await TagModel.findOneAndDelete({_id: params.id});

  const data = await CollectionModel.find({tag: params.id});

  // 删除component中对应的tag
  data.forEach(item => {
    delete item.tag;
    item.save();
  });

  ctx.body = {
    code: 0,
    message: 'success'
  };
};
