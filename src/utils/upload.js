const qiniu = require('qiniu');

const accessKey = '0OtE7yPTUsK5WQLD3Zg5QSJqvenDQFuZwjgvxEX_';
const secretKey = 'RY8RwQzfpW1lVZ9PiHjk9Wk-046m7VqqxBy8bwZG';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


// 文件上传


exports.upload = function upload(config) {
  const filename = config.filename || 'unknown.jpg',
    filepath = config.file;
  const options = {
    scope: 'blog',
  };
  const defaultConfig = new qiniu.conf.Config();
// 空间对应的机房
  defaultConfig.zone = qiniu.zone.Zone_z2;
// 是否使用https域名
//defaultConfig.useHttpsDomain = true;
// 上传是否使用cdn加速
//defaultConfig.useCdnDomain = true;
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise(function (resolve, reject) {
    formUploader.putFile(
      uploadToken, filename, filepath, putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          resolve(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          resolve(respBody);
        }
      });
  });
};

exports.download = function () {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  var privateBucketDomain = 'http://blog.djl.pub';
  var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
  return privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, 'test2.jpg', deadline);
};

