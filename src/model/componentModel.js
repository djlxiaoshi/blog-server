const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ComponentSchema = new Schema({
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
  }
});

module.exports = mongoose.model('component', ComponentSchema);