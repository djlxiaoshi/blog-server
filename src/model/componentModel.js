const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ComponentSchema = new Schema({
  createUserId: {
    type: String,
    required: true,
    ref: 'user'
  },
  chineseName: {
    type: String,
    required: true
  },
  englishName: {
    type: String,
    required: true
  },
  dependencies: {
    type: String,
    required: true
  },
  gitlab: {
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
  }
});

module.exports = mongoose.model('component', ComponentSchema);