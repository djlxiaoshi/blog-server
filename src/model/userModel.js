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
    type: String
  },
  avatarKey: {
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

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('user');
} catch (error) {
  module.exports = mongoose.model('user', UserSchema);
}
