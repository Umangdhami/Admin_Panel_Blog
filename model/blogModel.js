const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  blogImg: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    // required: true,
  }
});

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;
