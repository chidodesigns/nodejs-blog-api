const req = require("express/lib/request");
const res = require("express/lib/response");
const Post = require("../models/Post");
const User = require("../models/User");
const PasswordUtilities = require("../utility/PasswordUtility");

const GetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(400).json("User Profile not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("There was an error trying to get your user profile");
  }
};

const UpdateUserById = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      req.body.password = await PasswordUtilities.HashPassword(
        req.body.password
      );
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json("There was an error trying to update your user profile");
    }
  } else {
    res.status(401).json("You can update only your account");
  }
};

const UserDeleteAccount = async (req, res) => {
  if (req.body.userId === req.params.id) {
    const user = await User.findById(req.params.id);
    if (user) {
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(404).json("User Not Found!");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
};

module.exports = {
  GetUserById,
  UpdateUserById,
  UserDeleteAccount
};
