const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//get user info
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //hide password
    user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "user get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user api",
      error,
    });
  }
};

//UPDATE user
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    //saveuser
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user api",
      error,
    });
  }
};

//passowrd update

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old and new password",
      });
    }
    //checkl user passowrd|| compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid old password",
      });
    }
    // Hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in password update api",
      error,
    });
  }
};

//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }

    // Hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in password reset:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error: error.message,
    });
  }
};

//delete profile
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete profile api",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
