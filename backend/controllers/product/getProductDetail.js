const productModel = require("../../models/productModel");

const getProductDetailController = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("productId: ", productId);
    const productData = await productModel.findById(productId);
    console.log("productData: ", productData);
    res.status(200).json({
      data: productData,
      message: "got product data successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("error: ", error.message);
    res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetailController;
