const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  createUserId: {
    type: String,
    required: true,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  img: {
    type: String,
  },
  tag: {
    type: String,
    required: false,
    ref: 'tag'
  },
  createTime:{
    type: String
  }
});

module.exports = mongoose.model('collection', CollectionSchema);
