const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageBase64: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('topic', topicSchema);