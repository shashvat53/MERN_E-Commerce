const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function SignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        message: "Please provide email and password",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    // console.log(user, "found");
    if (!user) {
      return res.status(200).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        message: "Invalid password.",
        error: true,
        success: false,
      });
    }

    const tokenData = {
      _id: user?._id,
      email: user?.email,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY_TOKEN, {
      expiresIn: 60 * 60 * 2,
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, tokenOption).status(200).json({
      message: "User logged in successfully.",
      data: token,
      error: false,
      success: true,
    });

    // console.log("check Password", checkPass);
  } catch (error) {
    console.log(error.message, "444");
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = SignInController;
