const ComponentModel = require('../../model/componentModel');
const fs = require('fs');
const url = require('url');

exports.uploadComponentImg = async (ctx, next) => {
  const files = ctx.request.files,
    imgPath = ctx.origin + '/img/' + /(upload).*/.exec(files.file.path)[0],
    params = ctx.request.body; // 获取body中的参数

  const{ img } = await ComponentModel.findById(params.componentId, 'img');

  // 更新数据库img地址
  await ComponentModel.findByIdAndUpdate(params.componentId, {
    img: imgPath
  });

  //  如果存在图片地址
  if (img) {
    const imgParseUrl = url.parse(img);

    // 删除原有图片，避免磁盘占用，同步方法
    fs.unlinkSync('static' + imgParseUrl.pathname);
  }

  ctx.body = {
    code: 0,
    data: {path: imgPath},
    message: '上传成功'
  };
};