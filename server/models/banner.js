const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Banner Schema
const BannerSchema = new Schema({
  imageUrl: {
    type: String
  },
  imageKey: {
    type: String
  },
  link: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  position: {
    type: String,
    enum: ['main', 'left-top', 'left-bottom', 'right-top', 'right-bottom'],
    default: 'main'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = Mongoose.model('Banner', BannerSchema);
