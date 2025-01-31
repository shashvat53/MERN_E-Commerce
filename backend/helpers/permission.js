const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
  const sessionUser = await userModel.findById(userId);
  // console.log("user: ", sessionUser);
  if (sessionUser.role !== "ADMIN") {
    return false;
  }

  return true;
};

module.exports = uploadProductPermission;
