const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  coverUrl: {
    type: String,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
  likes: {
    type: Number,
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('videos', VideoSchema);