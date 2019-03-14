const path = require('path');
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const session = require('koa-session'); // session 管理
const config = require('./config/config'); // 加载配置文件
const router = require('./routes/index'); // 加载路由
require('./model/index'); // 连接数据库
const serve = require('koa-static');

app.keys = ['djlxsdjlxs'];

const staticPath = path.join(__dirname, '../static');
// 解析post数据
app.use(koaBody({
  multipart:true, // 支持文件上传
  formidable:{
    uploadDir: path.join(__dirname, '../static/img'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:5 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置

    },
  }
}));

// or if you prefer all default config, just use => app.use(session(app));
app.use(session(config.session, app));

app.use(serve(
  staticPath
));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port, function () {
  console.log('服务器启动成功!');
});