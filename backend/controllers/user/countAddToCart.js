const addToCartModel = require("../../models/addToCartModel");

const countAddToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await addToCartModel.countDocuments({ userId: userId });
    // console.log("count: ", count);
    res.status(200).json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      error: false,
      success: true,
    });
  }
};

module.exports = countAddToCart;
