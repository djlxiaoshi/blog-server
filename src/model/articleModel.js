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
  tag: {
    type: String,
    required: false,
    ref: 'tag'
  },
  createTime:{
    type: String
  },
  updateTime: {
    type: String
  }
});

module.exports = mongoose.model('article', ArticleSchema);
