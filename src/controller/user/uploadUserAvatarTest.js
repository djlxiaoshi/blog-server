const UserModel = require('../../model/userModel');
const utils = require('../../utils/upload');
const appConfig = require('../../config/config');
const qiniuConfig = appConfig.qiniu;

exports.uploadUserAvatarTest = async (ctx, next) => {
  const files = ctx.request.files,
    user = ctx.session.user;

  try {
    const result = await utils.upload({
      prefix: 'avatar',
      file: files.file,
      coverKey: user.avatarKey
    });

    const avatar = `${qiniuConfig.previewHost}/${result.key}`;
    // 更新用户头像
    await UserModel.findByIdAndUpdate(user._id, {
      avatarKey: result.key,
      avatar
    });

    //  更新session中用户信息
    user.avatarKey = result.key;
    user.avatar = avatar;

    ctx.body = {
      code: 0,
      data: {
        avatarKey: result.key,
        avatar
      },
      message: '上传成功'
    };

  } catch (e) {
    ctx.body = {
      code: -2000,
      data: e,
      message: '上传失败'
    };
  }
};
