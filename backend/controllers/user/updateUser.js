const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId; // Assume req.userId is populated via middleware
    console.log("Session User ID:", sessionUser);

    const { userId, name, email, role } = req.body;

    // Construct the payload dynamically
    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    // Check if the user exists
    const user = await userModel.findById(sessionUser);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        error: true,
        success: false,
      });
    }

    console.log("User Role:", user.role);

    // Update the user and return the new document
    const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(400).json({
        message: "User could not be updated.",
        error: true,
        success: false,
      });
    }

    console.log("Updated User:", updatedUser);

    res.status(200).json({
      data: updatedUser,
      success: true,
      error: false,
      message: "User updated successfully.",
    });
  } catch (error) {
    console.error("Error updating user:", error);

    res.status(500).json({
      message: "Internal server error.",
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
