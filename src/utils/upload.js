/***
 * 参考七牛云官方提供Node.js的SDK文档
 * https://developer.qiniu.com/kodo/sdk/1289/nodejs
 */

const qiniu = require('qiniu');
const uuid = require('uuid/v4');
const dayjs = require('dayjs');
const appConfig = require('../config/config'),
  qiniuConfig = appConfig.qiniu;

// 生成鉴权对象
const mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);

// 文件上传
exports.upload = function (config) {
  const file = config.file,
    postfixArr = file.name.split('.'),
    postfix = postfixArr[postfixArr.length - 1],
    prefix = config.prefix || 'blog',
    fileKey = config.coverKey || `${prefix}_${ uuid() }.${ postfix }`,
    filePath = file.path,
    bucket = qiniuConfig.bucket,
    options = {
      scope: config.coverKey ? `${bucket}:${config.coverKey}` : bucket, // 如果是覆盖上传，请指定要被覆盖文件的名称
      expires: 7200 // 自定义凭证有效期 单位为秒
    };

  const putPolicy = new qiniu.rs.PutPolicy(options),
    uploadToken = putPolicy.uploadToken(mac), // 生成上传凭证
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
        console.log('respBody', respBody)
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          try {
            if (config.coverKey) {
              // 如果是覆盖图片   强制刷新dns缓存
              refresh(`${qiniuConfig.previewHost}/${fileKey}`);
            }
            resolve(respBody);
          } catch (e) {
            reject(e);
          }
        } else {
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



exports.uploadFromUrl = function (resUrl, filename) {

  //要上传的空间
  const bucket = appConfig.qiniu.bucket;
  const mac = new qiniu.auth.digest.Mac(appConfig.qiniu.accessKey, appConfig.qiniu.secretKey);
  const qiniuConfig = new qiniu.conf.Config();
  const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

  filename = filename ? `blog/${dayjs().format('YYYY-MM-DD')}/${filename}` : `blog/${dayjs().format('YYYY-MM-DD')}/${uuid()}`
  return new Promise(function(resolve, reject) {
    bucketManager.fetch(resUrl, bucket, filename, function(err, respBody, respInfo) {
      if (err) {  
        reject(err);
      } else {
        resolve({ respBody, respInfo })
      }
    });
  });
  
}

