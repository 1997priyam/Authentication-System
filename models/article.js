const mongoose = require('mongoose')
var Schema = mongoose.Schema

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  imageBase64: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isFeatured: { 
    type: Boolean, 
    default: false 
  }
});

module.exports = mongoose.model('article', articleSchema);