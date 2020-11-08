const SystemModel = require('../../model/systemModel');

exports.changeSystemConfig = async (ctx, next) => {
  const bodyParams = ctx.request.body;

  const data = await SystemModel.updateOne({}, bodyParams, {upsert: true});

  ctx.body = {
    code: 0,
    message: 'success',
    data: data
  };
};
