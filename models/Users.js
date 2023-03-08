const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: false,
      default: "Regular Human",
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/dsghy4siv/image/upload/v1678047500/desert_yezlzc.jpg",
    },
    bio: {
      type: String,
      default: "Hey!, I am Ta'veren",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
