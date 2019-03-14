const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TagSchema = new Schema({
  createUserId: {
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
  }
});

module.exports = mongoose.model('tag', TagSchema);