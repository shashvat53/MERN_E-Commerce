const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");

    // console.log("query: ", query);
    // console.log("regex: ", regex);

    const poductData = await productModel.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.status(200).json({
      data: poductData,
      message: "fetch all product",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
      success: true,
    });
  }
};

module.exports = searchProduct;
