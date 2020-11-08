// 用户信息数据模型

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const SystemSchema = new Schema({
  portalUser: {
    type: String,
    required: false,
    ref: 'user'
  },
  systemColor: {
    type: String,
    required: false
  },
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('system');
} catch (error) {
  module.exports = mongoose.model('system', SystemSchema);
}
