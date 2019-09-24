/*
* 项目配置文件
*
* */

module.exports = {
  host: '',  // 域名
  port: 3000, // 端口
  mongoUrl: 'mongodb://localhost:27017/blog', // mongodb连接信息
  session: {
    key: 'login', // cookie name
    maxAge: 86400000, // expires time 1 day
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  },
  uplaodImgPath: '/img',
  qiniu: {
    accessKey: '0OtE7yPTUsK5WQLD3Zg5QSJqvenDQFuZwjgvxEX_',
    secretKey: 'RY8RwQzfpW1lVZ9PiHjk9Wk-046m7VqqxBy8bwZG',
    bucket: 'images',
    previewHost: 'http://images.djl.pub'  // 在七牛云后台进行域名配置并解析，解析在你购买域名的平台上进行解析
  }
};
