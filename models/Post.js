const mongoose = require("mongoose");

//N:B If you make required false for a String, MongoDB would not show it by default because required is false, To show it either make required False
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: {
      type: Array,
      required: false,
    },
    likes: {
      type: Array,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
