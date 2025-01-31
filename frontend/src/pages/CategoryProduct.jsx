import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../config/productCategory";
import { filterProductApi } from "../helpers/Product";
import SearchProductCard from "../components/SearchProductCard";

const CategoryProduct = () => {
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [data, setData] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");
  // console.log("urlCategoryListArray ", urlCategoryListArray);

  const urlCategoryListObject = {};

  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((pre) => {
      return {
        ...pre,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryName) =>
        // console.log(categoryName)
        {
          if (selectCategory[categoryName]) {
            return categoryName;
          }
          return null;
        }
      )
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    console.log("urlFormat: ", urlFormat.join(""));
    navigate(`/product-category?${urlFormat.join("")}`);
    // console.log("arrayOfCategory: ", arrayOfCategory);
  }, [selectCategory]);

  const fetchData = async () => {
    setloading(true);
    const responseData = await filterProductApi(filterCategoryList);
    setloading(false);
    console.log("responseData: ", responseData);
    setData(responseData?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((pre) => pre.sort((a, b) => a?.sellingPrice - b?.sellingPrice));
    }
    if (value === "dsc") {
      setData((pre) => pre.sort((a, b) => b?.sellingPrice - a?.sellingPrice));
    }
  };

  useEffect(() => {
    // handleOnChangeSortBy(e);
    // handleSelectCategory(e);
  }, [sortBy]);
  return (
    <div className="container mx-auto p-4">
      <div className="hidden md:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-155px)]">
          {/* sort by price */}
          <div>
            <h4 className="text-base font-medium uppercase border-b border-slate-300 pb-1">
              Sort by
            </h4>

            <form className="flex flex-col text-sm gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by category */}
          <div>
            <h4 className="text-base font-medium uppercase border-b border-slate-300 pb-1">
              Category
            </h4>

            <form className="flex flex-col text-sm gap-2 py-2">
              {productCategory.map((category) => (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    value={category?.value}
                    id={category?.value}
                    checked={selectCategory[category?.value]}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="min-h-[calc(100vh-200px)] overflow-y-scroll max-h-[calc(100vh-200px)] scrollbare-none">
            {data.length !== 0 && !loading && (
              <SearchProductCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
