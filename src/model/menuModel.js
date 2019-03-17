const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MenuSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  path: {
    type: String,
    required: true
  },
  system: {
    // 所属系统
    type: String,
    required: true
  },
  createTime: {
    type: String
  }
});

module.exports = mongoose.model('menu', MenuSchema);
