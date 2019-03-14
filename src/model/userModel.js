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
    required: true
  }
});

module.exports = mongoose.model('user', UserSchema);
