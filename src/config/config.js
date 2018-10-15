/*
* 项目配置文件
*
* */

module.exports = {
  host: '',  // 域名
  port: 3000, // 端口
  mongoUrl: 'mongodb://localhost:27017/website', // mongodb连接信息
  session: {
    key: 'koa:sess', // cookie name
    maxAge: 86400000, // expires time
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  },
  allowOrigin: 'http://localhost:8080'
};