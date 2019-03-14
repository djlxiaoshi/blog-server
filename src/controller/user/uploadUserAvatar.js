const UserModel = require('../../model/userModel');
const fs = require('fs');
const url = require('url');

exports.uploadUserAvatar = async (ctx, next) => {
  const files = ctx.request.files,
    user = ctx.session.user,
    imgPath = ctx.origin + '/img/' + /(upload).*/.exec(files.file.path)[0]

  // 根据用户id查找，用户头像地址
  const{ avatar } = await UserModel.findById(user._id, 'avatar');

  // 更新用户头像
  await UserModel.findByIdAndUpdate(user._id, {
    avatar: imgPath
  });

  //  如果存在图片地址
  if (avatar) {
    const avatarParseUrl = url.parse(avatar);

    // 删除原有图片，避免磁盘占用，同步方法
    fs.unlinkSync('static' + avatarParseUrl.pathname);
  }

  ctx.body = {
    code: 0,
    data: {path: imgPath},
    message: '上传成功'
  };
};