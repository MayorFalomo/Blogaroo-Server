const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const { db } = require("../models/Users");

//UPDATE - Using the put method , we put the id in the route then do an if check,
//if the userId is the same as the one in the url params the do another if check and scramble the password
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } //When this line is added whatever you update shows immediately in postman
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can only update your Account!");
  }
});

// First the if statement says if the userId = the id in the url then carry out the tryCatch block else write "You can only delete your account"
// The first tryCatch block code says find the id in the url of the user and assign it to the user variable and if it doesn't find it the catch block says output "User not found"
// the next tryCatch now says deleteMany Post(model) and the username the the next line says delete the Users Id in the url and write "Account deleted"
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("This User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User Not Found");
    }
  } else {
    res.status(401).json("You can only delete your account");
  }
});

//Get a Single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a single user Bio -
router.get(`/get-user/:username`, async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.find({ username });
    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Alll Users
router.get("/", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
