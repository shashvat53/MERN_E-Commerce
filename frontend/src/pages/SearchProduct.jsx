import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { searchProductApi } from "../helpers/Product";
import SearchProductCard from "../components/SearchProductCard";

const SearchProduct = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const responseData = await searchProductApi(location?.search);
      setData(responseData?.data);
      setLoading(false);

      console.log("responseData: ", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-3xl text-center">Loading...</p>}
      {data.length == 0 && !loading && (
        <p className="text-3xl text-center">Product not found</p>
      )}
      <p className="text-lg font-semibold my-3">
        Search Results : {data.length}
      </p>
      {data.length !== 0 && !loading && (
        <SearchProductCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
