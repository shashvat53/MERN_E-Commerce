const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }
    const { _id, ...resbody } = req.body;

    console.log("resbody: ", resbody);
    const updatedProduct = await productModel.findByIdAndUpdate(_id, resbody);

    res.status(200).json({
      message: "Product Updated successfully",
      data: updatedProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;
