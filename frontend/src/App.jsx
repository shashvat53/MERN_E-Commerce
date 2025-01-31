import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { userDetails } from "./helpers/Auth";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import "./App.css";
import { countAddToCartProductApi } from "./helpers/AddToCart";

function App() {
  const dispatch = useDispatch();
  const [countAddToCart, setAddToCart] = useState(0);
  const fetchUserData = async () => {
    try {
      const result = await userDetails();
      // console.log(result, "88888");
      if (result.data.success) {
        dispatch(setUserDetails(result.data.data));
        // console.log("first");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCountAddToCartProduct = async () => {
    try {
      const responseData = await countAddToCartProductApi();
      // console.log("88888", responseData);
      setAddToCart(responseData?.data?.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCountAddToCartProduct();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fetchUserData, fetchCountAddToCartProduct, countAddToCart }}
      >
        <Header />
        <main className="min-h-[calc(100vh-57px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
