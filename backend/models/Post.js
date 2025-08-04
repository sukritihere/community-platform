const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Post content is required'],
    maxlength: [280, 'Post cannot exceed 280 characters'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Populate author info when querying posts
postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name email bio profilePicture'
  });
  next();
});

module.exports = mongoose.model('Post', postSchema);