const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, '数据库连接失败'));
db.once('open', function() {
  console.log('数据库连接成功!')
});