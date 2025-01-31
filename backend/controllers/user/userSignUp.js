const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).json({
        error: true,
        success: false,
        message: "User already exist.",
      });
    }

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(200).json({
        error: true,
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Use `await` for asynchronous bcrypt operations
    const hashPassword = await bcrypt.hash(password, salt);

    // Prepare the user data
    const userPayload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    // Save the user to the database
    const newUser = new userModel(userPayload);
    const savedUser = await newUser.save();

    // Respond with success
    return res.status(200).json({
      data: savedUser,
      error: false,
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    return res.status(500).json({
      error: true,
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = userSignUpController;
