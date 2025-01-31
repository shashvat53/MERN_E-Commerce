import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../config/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../config/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { updateProductApi } from "../helpers/Product";
import { toast } from "react-toastify";

const AdminEditProduct = ({ onClose, productData, fetchAllProduct }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleUploadProductImg = async (e) => {
    const file = e.target.files[0];
    const uploadImgCloudinary = await uploadImage(file);
    setData((pre) => {
      return {
        ...pre,
        productImage: [...pre.productImage, uploadImgCloudinary.url],
      };
    });
    // console.log("uploadImgCloudinary", uploadImgCloudinary.url);
  };

  const handleDeleteProductImg = (index) => {
    let newProductImg = [...data.productImage];
    newProductImg.splice(index, 1);
    setData((pre) => {
      return {
        ...pre,
        productImage: [...newProductImg],
      };
    });
    // console.log(newProductImg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("data", data);

    try {
      const res = await updateProductApi(data);
      //   console.log(res, "999");
      if (res.success) {
        toast.success(res?.message);
        onClose();
        fetchAllProduct();
      }
      if (res.error) {
        toast.error("please fill all the product details");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full h-full bg-black z-10 bg-opacity-40 top-0 right-0 bottom-0 left-0 flex justify-center items-center">
      <div className="rounded bg-white p-4 w-full h-full max-w-3xl max-h-[80%] overflow-hidden ">
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-lg  font-bold">Edit Product</h2>
          <div
            className="text-2xl cursor-pointer hover:text-red-600"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data?.productName}
            onChange={handleOnchange}
            className="p-2 bg-slate-200 border"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Product Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnchange}
            className="p-2 bg-slate-200 border"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            value={data.category}
            id="category"
            name="category"
            onChange={handleOnchange}
            className="p-2 bg-slate-200 border"
            required
          >
            <option value={""} disabled>
              Select Category
            </option>
            {productCategory.map((category) => (
              <option key={category.id} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImage">
            <div className="w-full h-32 bg-slate-200 p-2 flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col">
                <span className="text-5xl">
                  <FaCloudUploadAlt />
                </span>
                <p>Upload product image</p>
              </div>
              <input
                type="file"
                id="uploadImage"
                className="hidden"
                onChange={handleUploadProductImg}
                // value={data?.productImage}
                // required
              />
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center  gap-2">
                {data?.productImage.map((el, index) => (
                  <div className=" relative group">
                    <img
                      key={el}
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      onClick={() => {
                        setFullScreenImageUrl(el), setOpenFullScreenImage(true);
                      }}
                      className="bg-slate-100 cursor-pointer"
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded-full cursor-pointer hidden group-hover:block active:bg-red-700"
                      onClick={() => handleDeleteProductImg(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-600">
                Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            name="price"
            value={data.price}
            onChange={handleOnchange}
            className="p-2 bg-slate-200 border"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter selling price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnchange}
            className="p-2 bg-slate-200 border"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            className="h-32 bg-slate-200 border p-2"
            placeholder="Enter product description"
            onChange={handleOnchange}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-red-600 text-white px-3 py-2 mb-10 mt-3 hover:bg-red-700"
          >
            Update Product
          </button>
        </form>
      </div>

      {/* display full image */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          ImgUrl={fullScreenImageUrl}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
