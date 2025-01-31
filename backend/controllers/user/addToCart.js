const addToCartModel = require("../../models/addToCartModel");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    const isProductAvailabel = await addToCartModel.findOne({
      productId,
      userId: currentUser,
    });
    console.log("isProductAvailabel:  ", isProductAvailabel);

    if (isProductAvailabel) {
      return res.json({
        message: "Product already exist",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();
    res.status(200).json({
      data: saveProduct,
      message: "Product Added",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("first: ", error.message);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
