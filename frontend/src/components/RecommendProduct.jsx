import React, { useContext, useEffect, useRef, useState } from "react";
import { getCategoryWiseProductApi } from "../helpers/Product";
import displayINRCurrency from "../config/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../config/addToCart";
import scrollTop from "../config/scrollTop";
import Context from "../context";

const RecommendProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(12).fill(null);
  const context = useContext(Context);

  // console.log("first", category);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseData = await getCategoryWiseProductApi(category);
      setLoading(false);
      setData(responseData?.data);
      //   console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    context.fetchCountAddToCartProduct();
  };

  return (
    <div className="container mx-auto  my-4 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-hidden scrollbar-none transition-all">
        {loading
          ? loadingList.map((product) => (
              <div className="w-full min-w-[280] md:min-w-[320px] max-w-[280px] md:max-w-[320px]   bg-white shadow rounded-sm ">
                <div className="min-w-[120px] md:min-w-[145px] bg-slate-200 h-48 p-4 flex justify-center items-center animate-pulse">
                  {/* <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                /> */}
                </div>
                <div className=" grid gap-3 p-4">
                  <h2 className="line-clamp-1 text-ellipsis text-base md:text-lg font-semibold p-2 bg-slate-200 animate-pulse rounded-full">
                    {/* {product?.productName} */}
                  </h2>
                  <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full">
                    {/* {product?.category} */}
                  </p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-semibold p-1 bg-slate-200 animate-pulse rounded-full w-full">
                      {" "}
                      {/* {displayINRCurrency(product?.sellingPrice)} */}
                    </p>
                    <p className="text-slate-500 line-through p-1 bg-slate-200 animate-pulse rounded-full w-full">
                      {" "}
                      {/* {displayINRCurrency(product?.price)} */}
                    </p>
                  </div>

                  <button className=" hover:bg-red-700 text-white text-sm px-3 py-3 w-full  p-2 bg-slate-200 animate-pulse rounded-full">
                    {/* Add To Cart */}
                  </button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                to={`/product-detail/${product?._id}`}
                onClick={scrollTop}
                className="w-full min-w-[280] md:min-w-[300px] max-w-[280px] md:max-w-[300px]   bg-white shadow rounded-sm "
              >
                <div className="min-w-[120px] md:min-w-[145px] bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4">
                  <h2 className="line-clamp-1 text-ellipsis text-base md:text-lg font-semibold">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-semibold">
                      {" "}
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {" "}
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product?._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 w-full rounded-full mt-2"
                  >
                    Add To Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default RecommendProduct;

// min-w-[280px] md:min-w-[320] max-w-[280px] md:max-w-[320px]
