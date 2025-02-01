import React, { useContext, useEffect, useState } from "react";
import {
  deleteCartProductApi,
  paymentApi,
  updateCartProductApi,
  viewCartProductApi,
} from "../helpers/AddToCart";
import Context from "../context";
import displayINRCurrency from "../config/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadinListCart = new Array(context?.countAddToCart).fill(null);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const responseData = await viewCartProductApi();
      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);

    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      //   console.log(first);
      const responseData = await updateCartProductApi(id, qty + 1);
      if (responseData?.success) {
        fetchData();
      }
      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (id, qty) => {
    try {
      if (qty >= 2) {
        //   console.log(first);
        const responseData = await updateCartProductApi(id, qty - 1);
        if (responseData?.success) {
          fetchData();
        }
        // console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartProduct = async (id) => {
    try {
      const responseData = await deleteCartProductApi(id);
      console.log("responseData >>>>", responseData);
      if (responseData?.success) {
        fetchData();
        context?.fetchCountAddToCartProduct();
      }
      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const tatolQty = data && data?.reduce((pre, curr) => pre + curr?.quantity, 0);
  const tatolPrice =
    data &&
    data?.reduce(
      (pre, curr) => pre + curr?.productId?.sellingPrice * curr?.quantity,
      0
    );

  const handlePayment = async () => {
    try {
      const stripePromise = await loadStripe(
        import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY
      );
      const responseData = await paymentApi(data);
      console.log("responseData: ", responseData);
      if (responseData?.id) {
        stripePromise.redirectToCheckout({ sessionId: responseData?.id });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="text-lg text-center">
        {data?.length == 0 && !loading && (
          <p className="p-4 bg-white">No Data</p>
        )}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row w-full lg:justify-between">
        {/* View product */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadinListCart?.map((el, index) => (
              <div
                key={index + "Loading cart"}
                className="w-full bg-slate-200 h-32 border my-3 border-slate-300 rounded animate-pulse"
              ></div>
            ))
          ) : (
            <div>
              {data?.map((product) => (
                <div
                  key={product?.productId?._id}
                  className="w-full bg-white h-32 border my-3 border-slate-300 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-32 h-32 bg-slate-200 p-2">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt={product?.productId?.productName}
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>

                  <div className="px-4 py-2 relative">
                    <div className="absolute right-2">
                      <button
                        onClick={() => handleDeleteCartProduct(product?._id)}
                        className="text-xl p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-full"
                      >
                        <MdDelete />
                      </button>
                    </div>

                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                      {product?.productId?.productName}
                    </h2>
                    <p className="capitalize text-slate-600">
                      {product?.productId?.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-red-600 font-medium text-lg">
                        {displayINRCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 font-medium text-lg">
                        {displayINRCurrency(
                          product?.productId?.sellingPrice * product?.quantity
                        )}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-1 ">
                      <button
                        onClick={() =>
                          decreaseQty(product?._id, product?.quantity)
                        }
                        className="text-red-600 border border-red-600 h-6 w-6 hover:bg-red-600 hover:text-white flex justify-center items-center rounded"
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQty(product?._id, product?.quantity)
                        }
                        className="text-red-600 border border-red-600 h-6 w-6 hover:bg-red-600 hover:text-white flex justify-center items-center rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* product summary */}

        {data[0] && (
          <div className="mt-4 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="w-full bg-slate-200 h-36 border my-3 border-slate-300 rounded animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white mt-3">
                <h2 className="px-4 py-1 bg-red-600 text-white text-center">
                  Summary
                </h2>
                <div className="flex justify-between px-4 py-2 gap-2 font-medium text-slate-500">
                  <p>Quantity: </p>
                  <p>{tatolQty}</p>
                </div>
                <div className="flex justify-between px-4 py-2 gap-2 font-medium text-slate-500">
                  <p>Total Price: </p>
                  <p>{displayINRCurrency(tatolPrice)}</p>
                </div>

                <button
                  onClick={handlePayment}
                  className="bg-blue-600 text-white w-full px-4 py-2 font-bold"
                >
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
