import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { getAllProductApi } from "../helpers/Product";
import AdminProductCard from "../components/AdminProductCard";
const AllProducts = () => {
  const [openUploadPro, setOpenUploadPro] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const res = await getAllProductApi();
      // console.log(res.data);
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">All Products</h1>
        <button
          onClick={() => setOpenUploadPro(true)}
          className="py-1 px-3 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all rounded-full"
        >
          Upload Product
        </button>
      </div>
      <div className="grid grid-cols-5 items-center flex-wrap h-[calc(100vh-205px)] overflow-y-scroll py-5 gap-4">
        {allProducts.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index}
            fetchAllProduct={fetchAllProduct}
          />
        ))}
      </div>

      {/* upload product */}

      {openUploadPro && (
        <UploadProduct
          onClose={() => setOpenUploadPro(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
