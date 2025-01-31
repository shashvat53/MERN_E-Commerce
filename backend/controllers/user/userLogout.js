const userLogout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logout successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while User logout.",
      error: true,
      success: false,
    });
  }
};

module.exports = userLogout;
