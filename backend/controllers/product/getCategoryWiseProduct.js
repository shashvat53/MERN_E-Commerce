const productModel = require("../../models/productModel");

const getCategoryWiseProdut = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    // console.log("category", category);
    const response = await productModel.find({ category });

    // console.log("product", response);
    res.status(200).json({
      message: "fetched products successfully",
      data: response,
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

module.exports = getCategoryWiseProdut;
