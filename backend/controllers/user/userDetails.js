const userModel = require("../../models/userModel");

async function userDetailController(req, res) {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({
        message: "faild to fetch user details.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "successfully fetched user details.",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailController;
