const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TagSchema = new Schema({
  createUser: {
    type: String,
    required: true,
    ref: 'user'
  },
  label: {
    type: String,
    required: true
  },
  createTime: {
    type: String,
    required: false
  },
  articles: {
    type: Array
  }
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('tag');
} catch (error) {
  module.exports = mongoose.model('tag', TagSchema);
}
