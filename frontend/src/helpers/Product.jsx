import apiInstance from "../config/axios";

export const uploadProductApi = async (data) => {
  try {
    const res = await apiInstance.post("/upload-product", data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllProductApi = async () => {
  try {
    const res = await apiInstance.get("/all-product");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const updateProductApi = async (data) => {
  try {
    const res = await apiInstance.put("/update-product", data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getOneProductByCategoryApi = async () => {
  try {
    const res = await apiInstance.get("/category-product");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCategoryWiseProductApi = async (category) => {
  try {
    const res = await apiInstance.post("/category-wise-product", {
      category: category,
    });
    // console.log(res);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getProductDetailApi = async (productId) => {
  try {
    const response = await apiInstance.post("/product-detail", {
      productId: productId,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const searchProductApi = async (query) => {
  // console.log("before API: ", query);
  try {
    const response = await apiInstance.get("/search" + query);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const filterProductApi = async (filterCategoryList) => {
  // console.log("before API: ", filterCategoryList);
  try {
    const response = await apiInstance.post("/filter", {
      category: filterCategoryList,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};
