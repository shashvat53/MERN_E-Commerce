import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../config/displayCurrency";

const AdminProductCard = ({ data, fetchAllProduct }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className=" ">
        <div className="w-full h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            className="mx-auto object-fill h-full "
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data?.productName}</h1>
        <div>
          <div>
            <p className="font-semibold">
              {displayINRCurrency(data?.sellingPrice)}
            </p>
          </div>
          <div
            onClick={() => setEditProduct(true)}
            className="w-fit ml-auto p-2 bg-green-200 rounded-full hover:bg-green-600 hover:text-white cursor-pointer"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
