const addToCartModel = require("../../models/addToCartModel");

const viewAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await addToCartModel
      .find({
        userId: currentUser,
      })
      .populate("productId")
      .sort({ createdAt: -1 });
    // console.log(allProduct);
    res.status(200).json({
      data: allProduct,
      message: "Found all cart product",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: false,
      success: true,
    });
  }
};

module.exports = viewAddToCartProduct;
