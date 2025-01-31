const addToCartModel = require("../../models/addToCartModel");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const cartProductId = req.body.id;
    const qyt = req.body.quantity;

    const updatedProduct = await addToCartModel.updateOne(
      { _id: cartProductId },
      {
        ...(qyt && { quantity: qyt }),
      }
    );
    res.status(200).json({
      data: updatedProduct,
      message: "Updated cart product qyt",
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

module.exports = updateAddToCartProduct;
