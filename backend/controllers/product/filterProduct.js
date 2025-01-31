const productModel = require("../../models/productModel");

const filterProduct = async (req, res) => {
  try {
    const categoryList = req.body.category;
    const allProduct = await productModel.find({
      category: {
        $in: categoryList,
      },
    });
    res.status(200).json({
      message: "filtered all product",
      data: allProduct,
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

module.exports = filterProduct;
