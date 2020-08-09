const mongoose = require('mongoose');
const { articleSchema } = require('./article');
var Schema = mongoose.Schema

const topicSchema = new Schema({
  name: {
    type: String,
    index: {
      unique: true, 
      dropDups: true
    },
    required: true
  },
  imageBase64: {
    type: String,
    required: true
  },
  article: [{
    type: Schema.Types.ObjectId,
    ref: 'article'
  }]
});

module.exports = mongoose.model('topic', topicSchema);