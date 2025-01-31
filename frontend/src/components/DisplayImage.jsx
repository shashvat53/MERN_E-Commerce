import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ ImgUrl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 shadow-lg rounded max-e-5xl">
        <div
          className="text-2xl cursor-pointer hover:text-red-600 w-fit ml-auto"
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div className="max-w-[80vh] max-h-[80vh] p-4">
          <img src={ImgUrl} alt={ImgUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
