const userModel = require("../../models/userModel");

const allUsers = async (req, res) => {
  try {
    // console.log("allUSerId: ", req.userId);
    const alluser = await userModel.find();
    res.status(200).json({
      message: "fetched all user",
      data: alluser,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = allUsers;
