const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const TagSchema = new Schema({
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