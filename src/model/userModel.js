// 用户信息数据模型

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  },
  avatarKey: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  info: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  wechat: {
    type: String,
    required: false
  },
  github: {
    type: String,
    required: false
  },
  juejin: {
    type: String,
    required: false
  },
  jianshu: {
    type: String,
    required: false
  },
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('user');
} catch (error) {
  module.exports = mongoose.model('user', UserSchema);
}
