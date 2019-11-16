const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const CommentSchema = new Schema({
  createUser: {
    type: String,
    required: true,
    ref: 'user'
  },
  content: {
    type: String,
  },
  articleId: {
    required: true,
    type: String,
  },
  replyUser: {
    type: String,
    ref: 'user'
  },
  createTime:{
    type: String
  }
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('comment');
} catch (error) {
  module.exports = mongoose.model('comment', CommentSchema);
}
