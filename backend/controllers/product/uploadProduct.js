const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

const uploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    // console.log("first", saveProduct);
    res.status(200).json({
      data: saveProduct,
      message: "Product Added Successfuly.",
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

module.exports = uploadProductController;
