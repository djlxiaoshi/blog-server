const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  createUser: {
    type: String,
    required: true,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  thumbnail: {
    type: String
  },
  abstract: {
    type: String
  },
  tags: [
    { type: String, ref: 'tag' }
  ],
  status: { // 文章状态 0：草稿 1：已发布 2：待删除
    type: Number
  },
  createTime:{
    type: Number
  },
  updateTime: {
    type: Number
  },
  isReprinted: {
    type: Boolean
  },
  origin: {
    type: String
  }
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('article');
} catch (error) {
  module.exports = mongoose.model('article', ArticleSchema);
}
