const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const SystemSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  permission: {
    type: Array
  },
  menus: [
    { type: String, ref: 'menu' }
  ],
  createTime: {
    type: String
  }
});

module.exports = mongoose.model('system', SystemSchema);
