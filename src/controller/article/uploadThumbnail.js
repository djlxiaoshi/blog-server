const UserModel = require('../../model/userModel');
const ArticleModel = require('../../model/articleModel');
const utils = require('../../utils/upload');
const appConfig = require('../../config/config');
const qiniuConfig = appConfig.qiniu;;


module.exports = async (ctx, next) => {
  const files = ctx.request.files,
    user = ctx.session.user;
    bodyParams = ctx.request.body;

  try {
    const result = await utils.upload({
      prefix: 'thumbnail',
      file: files.file,
      coverKey: bodyParams.prevThumbnailKey
    });

    await ArticleModel.updateOne({_id: bodyParams.articleId}, {
      thumbnailKey: result.key,
      thumbnail: `${qiniuConfig.previewHost}/${result.key}`,
      updateTime: Date.now()
    })
    ctx.body = {
      code: 0,
      data: {
        thumbnailKey: result.key,
        thumbnail: `${qiniuConfig.previewHost}/${result.key}`
      },
      message: '上传成功'
    };

  } catch (e) {
    console.log('error', e)
    ctx.body = {
      code: -2000,
      data: e,
      message: '上传失败'
    };
  }
};
