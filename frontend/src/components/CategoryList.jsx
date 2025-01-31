import React, { useEffect, useState } from "react";
import { getOneProductByCategoryApi } from "../helpers/Product";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryProductLoading = new Array(12).fill(null);

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await getOneProductByCategoryApi();
      //   console.log(response);
      setLoading(false);
      setCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container  mx-auto p-4">
      <div className="flex items-center justify-between gap-4 overflow-scroll scrollbare-none">
        {loading
          ? categoryProductLoading.map((el, index) => (
              <div
                key={index + 1}
                className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200 animate-pulse"
              ></div>
            ))
          : categoryProduct?.map((product) => (
              <Link
                to={`/product-category?category=${product?.category}`}
                key={product?.category}
              >
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
