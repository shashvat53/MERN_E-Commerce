const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    // console.log("first", token);

    if (!token) {
      return res.status(200).json({
        message: "Please Login...",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET_KEY_TOKEN, function (err, decoded) {
      // console.log("decoded  ", decoded);

      if (err) {
        console.log(err, "Error in AuthToken");
      }
      req.userId = decoded?._id;
      next();
    });
    // console.log("My token  -   ", token);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
