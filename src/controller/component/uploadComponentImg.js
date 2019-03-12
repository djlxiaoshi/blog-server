const ComponentModel = require('../../model/componentModel');

exports.uploadComponentImg = async (ctx, next) => {
  const files = ctx.request.files,
    imgPath = ctx.origin + '/img/' + /(upload).*/.exec(files.file.path)[0],
    params = ctx.request.body; // 获取body中的参数

  console.log(params)
  await ComponentModel.findByIdAndUpdate(params.componentId, {
    img: imgPath
  });

  ctx.body = {
    code: 0,
    data: {path: imgPath},
    message: '上传成功'
  };
};