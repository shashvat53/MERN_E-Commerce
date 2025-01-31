const express = require("express");
const router = express.Router();
const userSignUpController = require("../controllers/user/userSignUp");
const SignInController = require("../controllers/user/userSignIn");
const authToken = require("../middleware/AuthToken");
const userDetailController = require("../controllers/user/userDetails");
const userLogout = require("../controllers/user/userLogout");
const allUsers = require("../controllers/user/allUsers");
const updateUser = require("../controllers/user/updateUser");
const uploadProductController = require("../controllers/product/uploadProduct");
const getProductController = require("../controllers/product/getProduct");
const updateProductController = require("../controllers/product/updateProduct");
const getCategoryProductOne = require("../controllers/product/getCategoryProductOne");
const getCategoryWiseProdut = require("../controllers/product/getCategoryWiseProduct");
const getProductDetailController = require("../controllers/product/getProductDetail");
const addToCartController = require("../controllers/user/addToCart");
const countAddToCart = require("../controllers/user/countAddToCart");
const viewAddToCartProduct = require("../controllers/user/viewAddToCartProduct");
const updateAddToCartProduct = require("../controllers/user/updateAddToCartProduct");
const deleteCartProduct = require("../controllers/user/deleteAddToCartProduct");
const searchProduct = require("../controllers/product/searchProduct");
const filterProduct = require("../controllers/product/filterProduct");
const stripeController = require("../controllers/order/paymentController");

router.post("/sign-up", userSignUpController);
router.post("/login", SignInController);
router.get("/user-details", authToken, userDetailController);
router.get("/user-logout", userLogout);

// for admin panel
router.get("/all-users", authToken, allUsers);
router.put("/update-user", authToken, updateUser);

// for product
router.post("/upload-product", authToken, uploadProductController);
router.get("/all-product", getProductController);
router.put("/update-product", authToken, updateProductController);
router.get("/category-product", getCategoryProductOne);
router.post("/category-wise-product", getCategoryWiseProdut);
router.post("/product-detail", getProductDetailController);
router.get("/search", searchProduct);
router.post("/filter", filterProduct);

// for add-to-cart
router.post("/add-to-cart", authToken, addToCartController);
router.get("/count-addtocart-product", authToken, countAddToCart);
router.get("/view-cart-product", authToken, viewAddToCartProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteCartProduct);

// for payment
router.post("/checkout", authToken, stripeController);
module.exports = router;
