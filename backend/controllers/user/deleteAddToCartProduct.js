const addToCartModel = require("../../models/addToCartModel");

const deleteCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body.id;
    console.log("productId:  ", productId);

    const deletedProduct = await addToCartModel.deleteOne({ _id: productId });
    res.status(200).json({
      data: deletedProduct,
      message: "Cart product deleted",
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

module.exports = deleteCartProduct;
