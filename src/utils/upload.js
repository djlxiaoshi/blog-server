const qiniu = require('qiniu');
const uuid = require('uuid/v4');
const appConfig = require('../config/config'),
  qiniuConfig = appConfig.qiniu;

const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);

// 文件上传
exports.upload = function upload(config) {
  const file = config.file,
    postfixArr = file.name.split('.'),
    postfix = postfixArr[postfixArr.length - 1],
    prefix = config.prefix || 'image',
    fileKey = config.coverKey || `${prefix}_${ uuid() }.${ postfix }`,
    filePath = file.path,
    bucket = qiniuConfig.bucket,
    options = {
      scope: config.coverKey ? `${bucket}:${config.coverKey}` : bucket,
    };

  const putPolicy = new qiniu.rs.PutPolicy(options),
    uploadToken = putPolicy.uploadToken(mac),
    formUploader = new qiniu.form_up.FormUploader(config),
    putExtra = new qiniu.form_up.PutExtra(),
    defaultConfig = new qiniu.conf.Config();

  // 空间对应的机房
  defaultConfig.zone = qiniu.zone.Zone_z2;
  // 是否使用https域名
  //defaultConfig.useHttpsDomain = true;
  // 上传是否使用cdn加速
  //defaultConfig.useCdnDomain = true;

  return new Promise(function (resolve, reject) {
    formUploader.putFile(
      uploadToken, fileKey, filePath, putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          // 刷新dns缓存
          refresh(`${qiniuConfig.previewHost}/${filekey}`);
          resolve(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          resolve(respBody);
        }
      });
  });
};

// 下载图片
exports.download = function (fileKey) {
  const config = new qiniu.conf.Config(),
    bucketManager = new qiniu.rs.BucketManager(mac, config),
    privateBucketDomain = qiniuConfig.previewHost,
    deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期

  return bucketManager.privateDownloadUrl(privateBucketDomain, fileKey, deadline);
};


function refresh(url) {
  // 待刷新URL列表
  const urlsToRefresh = [ url ],
    cdnManager = new qiniu.cdn.CdnManager(mac);

  //刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
  cdnManager.refreshUrls(urlsToRefresh, function(err, respBody, respInfo) {
    if (err) {
      throw err;
    }
    if (respInfo.statusCode === 200) {
      const jsonBody = JSON.parse(respBody);
      console.log(jsonBody);
      console.log('图片刷新成功！');
    }
  });

}

