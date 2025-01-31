import apiInstance from "../config/axios";

export const addToCartApi = async (id) => {
  try {
    const response = await apiInstance.post("/add-to-cart", { productId: id });
    // console.log("response: ", response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const countAddToCartProductApi = async () => {
  try {
    const response = await apiInstance.get("/count-addtocart-product");
    // console.log("response: ", response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const viewCartProductApi = async () => {
  try {
    const response = await apiInstance.get("/view-cart-product");
    // console.log("response: ", response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCartProductApi = async (id, qty) => {
  try {
    console.log("quantity: ", qty);
    const response = await apiInstance.post("/update-cart-product", {
      id: id,
      quantity: qty,
    });
    // console.log("response: ", response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCartProductApi = async (id) => {
  try {
    console.log("id: ", id);
    const response = await apiInstance.post("/delete-cart-product", {
      id: id,
    });
    // console.log("response: ", response?.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const paymentApi = async (data) => {
  try {
    const response = await apiInstance.post("/checkout", {
      cartItem: data,
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
