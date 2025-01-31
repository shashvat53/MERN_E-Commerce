import React, { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Moile from "../assets/banner/img1_mobile.jpg";
import image2Moile from "../assets/banner/img2_mobile.webp";
import image3Moile from "../assets/banner/img3_mobile.jpg";
import image4Moile from "../assets/banner/img4_mobile.jpg";
import image5Moile from "../assets/banner/img5_mobile.png";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const deskTopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Moile,
    image2Moile,
    image3Moile,
    image4Moile,
    image5Moile,
  ];

  const nextImg = () => {
    if (deskTopImages.length - 1 > currentImg) {
      setCurrentImg((pre) => pre + 1);
    }
  };
  const preImg = () => {
    if (currentImg != 0) {
      setCurrentImg((pre) => pre - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (deskTopImages.length - 1 > currentImg) {
        nextImg();
      } else {
        setCurrentImg(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImg]);

  return (
    <div className="container mx-auto px-4  rounded">
      <div className="bg-slate-200 w-full h-60 md:h-72 relative">
        <div className="absolute z-10 w-full h-full md:flex  items-center hidden ">
          <div className="w-full  flex justify-between text-2xl">
            <button
              onClick={preImg}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImg}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* for desktop and tablet version */}
        <div className="w-full h-full hidden md:flex overflow-hidden">
          {deskTopImages.map((imageURL) => (
            <div
              className="h-full w-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
              key={imageURL}
            >
              <img src={imageURL} className="h-full w-full " />
            </div>
          ))}
        </div>

        {/* for mobile version */}
        <div className="w-full h-full flex md:hidden overflow-hidden">
          {mobileImages.map((imageURL) => (
            <div
              className="h-full w-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
              key={imageURL}
            >
              <img src={imageURL} className="h-full w-full object-cover " />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
