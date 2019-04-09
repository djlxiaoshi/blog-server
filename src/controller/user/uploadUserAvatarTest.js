const UserModel = require('../../model/userModel');
const fs = require('fs');
const url = require('url');
const util = require('util');
const config = require('../../config/config');
var formidable = require('formidable');
const utils = require('../../utils/upload');

exports.uploadUserAvatarTest = async (ctx, next) => {
  const files = ctx.request.files;

  utils.upload({
    prefix: 'avatar',
    file: files.file,
    coverKey: 'test'
  }).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  });
  //
  // const url = utils.download();

  ctx.body = {
    code: 0,
    data: {
      url
    },
    message: '上传成功'
  };
};
