const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already exist register using other email",
      });
    }
    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const user = await userModel.create({
      userName,
      email,
      address,
      phone,
      password: hashedPassword,
      answer,
    });
    res.status(200).send({
      success: true,
      message: "Successfully registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};

//login
const loginContorller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please provide email and password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //checkl user passowrd|| compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid creditials",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7D",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginContorller };
