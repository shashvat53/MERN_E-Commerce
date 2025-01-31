const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");
require("dotenv").config();

const stripeController = async (request, response) => {
  try {
    const { cartItem } = request.body;
    // console.log("cartItem: ", cartItem);
    const user = await userModel.findOne({ _id: request.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1QmrY0GaWXYct5O0kpwK9XoD",
        },
      ],
      customer_email: user?.email,
      line_items: cartItem.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item?.productId?.productName,
              images: item?.productId?.productImage,
              metadata: { productId: item?.productId?._id },
            },

            unit_amount: item?.productId?.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item?.quantity,
        };
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);

    response.status(200).json(session);
  } catch (error) {
    response.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = stripeController;
