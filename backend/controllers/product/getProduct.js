const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const product = await productModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      data: product,
      message: "get all product",
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

module.exports = getProductController;
