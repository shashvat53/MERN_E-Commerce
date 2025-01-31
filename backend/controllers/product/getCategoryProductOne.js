const productModel = require("../../models/productModel");
const getCategoryProductOne = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");
    // console.log("category", productCategory);

    // array to store one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    // console.log("first", productByCategory);
    res.status(200).json({
      message: "Fetch category based product",
      data: productByCategory,
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
module.exports = getCategoryProductOne;
