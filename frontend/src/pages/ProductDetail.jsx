import React, { useContext, useEffect, useState } from "react";
import { getProductDetailApi } from "../helpers/Product";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../config/displayCurrency";
import RecommendProduct from "../components/RecommendProduct";
import addToCart from "../config/addToCart";
import Context from "../context";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");
  const productImgLoadingList = new Array(4).fill(null);
  const navigate = useNavigate();
  const params = useParams();
  const context = useContext(Context);
  const [zoomImgCoordinate, setZoomImgCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImg, setZoomImg] = useState(false);

  // console.log(params?.id);
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const responseData = await getProductDetailApi(params?.id);
      setData(responseData?.data);
      setActiveImg(responseData?.data?.productImage[0]);
      setLoading(false);

      console.log("ProductData: ", responseData?.data?.productImage[0]);
    } catch (error) {}
  };

  const handleMouseEnterImg = (imageUrl) => {
    setActiveImg(imageUrl);
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  const handleZoomImg = (e) => {
    setZoomImg(true);
    const { top, left, width, height } = e.target.getBoundingClientRect();
    console.log("Coordinate", top, left, width, height);
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImgCoordinate({ x, y });
  };

  const handleLeaveZoomImg = () => {
    setZoomImg(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    context?.fetchCountAddToCartProduct();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    context?.fetchCountAddToCartProduct();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px]  flex flex-col lg:flex-row gap-4">
        {/* product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="w-[300px] h-[300px] lg:w-96 lg:h-96 bg-slate-200 rounded  relative">
            <img
              onMouseMove={handleZoomImg}
              onMouseLeave={handleLeaveZoomImg}
              src={activeImg}
              className="h-full w-full object-scale-down mix-blend-multiply "
            />

            {zoomImg && (
              <div className="hidden lg:block absolute min-w-[400px] overflow-hidden min-h-[400px] bg-slate-200 top-0 -right-[520px] p-1">
                <div
                  className=" h-full  w-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImgCoordinate.x * 100}% ${
                      zoomImgCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            <div>
              {loading ? (
                <div className="flex gap-2 lg:flex-col">
                  {productImgLoadingList.map((el, index) => (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded animate-pulse"
                      key={index}
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-2 lg:flex-col">
                  {data?.productImage?.map((imageUrl, index) => (
                    <div
                      className="w-20 h-20 bg-slate-200 rounded "
                      key={imageUrl}
                    >
                      <img
                        onMouseEnter={() => handleMouseEnterImg(imageUrl)}
                        onClick={() => handleMouseEnterImg(imageUrl)}
                        src={imageUrl}
                        className="w-full h-full mix-blend-multiply object-scale-down cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* product details */}
        <div className="w-full">
          {loading ? (
            <div className="flex flex-col gap-1 w-full">
              <p className="bg-slate-200 text-red-600  w-16  lg:h-10  h-8 rounded-full animate-pulse "></p>
              <h2 className="text-2xl font-medium lg:text-4xl bg-slate-200 h-8 lg:h-10 rounded animate-pulse w-full"></h2>
              <p className="capitalize text-slate-400 bg-slate-200 h-8 lg:h-10 animate-pulse"></p>
              <div className="text-orange-500 flex gap-1 bg-slate-200 h-8 lg:h-10 animate-pulse"></div>

              <div className="flex gap-8  my-1 ">
                <p className="text-red-600 bg-slate-200 h-8 lg:h-10 animate-pulse w-full"></p>
                <p className="text-slate-400 line-through bg-slate-200 h-8 lg:h-10 animate-pulse w-full"></p>
              </div>

              <div className="flex items-center gap-4 my-2 w-full">
                <button className="bg-slate-200 h-8 lg:h-10 animate-pulse w-full rounded"></button>
                <button className="bg-slate-200 h-8 lg:h-10 animate-pulse w-full rounded"></button>
              </div>

              <div>
                <p className="bg-slate-200 h-8 lg:h-16 animate-pulse w-full rounded"></p>
                {/* <p className="">{data?.description} </p> */}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="bg-red-200 text-red-600 px-4 rounded-full w-fit">
                {data?.brandName}
              </p>
              <h2 className="text-2xl font-medium lg:text-4xl">
                {data?.productName}
              </h2>
              <p className="capitalize text-slate-400">{data?.category}</p>
              <div className="text-orange-500 flex gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className="flex gap-4 text-2xl lg:text-3xl font-medium my-1">
                <p className="text-red-600">
                  {displayINRCurrency(data?.sellingPrice)}
                </p>
                <p className="text-slate-400 line-through">
                  {displayINRCurrency(data?.price)}
                </p>
              </div>

              <div className="flex items-center gap-4 my-2">
                <button
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                  className="border-2 border-red-600 min-w-[120px] px-3 py-1 font-semibold hover:text-white hover:bg-red-600 text-red-600 rounded"
                >
                  Buy
                </button>
                <button
                  onClick={(e) => handleAddToCart(e, data?._id)}
                  className="border-2 border-red-600 min-w-[120px] px-3 py-1 bg-red-600 text-white font-semibold hover:bg-white hover:text-red-600 rounded"
                >
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium">Description : </p>
                <p className="">{data?.description} </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {data?.category && (
        <RecommendProduct
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetail;
