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
  permission: {
    type: Array
  },
  createTime: {
    type: Number
  }
});

/**
 * 当我们在多个地方引入model文件的时候，会导致mongoose重复注册model
 * https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose/28891860
 */
try {
  module.exports = mongoose.model('menu');
} catch (error) {
  module.exports = mongoose.model('menu', MenuSchema);
}
