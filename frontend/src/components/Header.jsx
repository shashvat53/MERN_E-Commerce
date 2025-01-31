import React, { useContext, useState } from "react";
import logo from "../assets/E-commerce logo.png";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogout } from "../helpers/Auth";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../config/role";
import Context from "../context";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  // console.log("location: ", location?.search);
  const urlSearch = new URLSearchParams(location.search);
  const searchQuery = urlSearch.getAll("q");
  // console.log("searchQuery: ", searchQuery);

  const [searchValue, setSearchValue] = useState(searchQuery);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  // console.log("header", user);
  const FisrtLaterOfName = user?.name[0].toUpperCase();
  // console.log("FisrtLaterOfName", FisrtLaterOfName);
  const context = useContext(Context);

  const handleLogout = async () => {
    try {
      const result = await userLogout();
      // console.log("user LogOut", result);
      if (result.success) {
        toast.success(result.message);
        dispatch(setUserDetails(null));
        navigate("/");
      }
      if (result.error) {
        toast.success(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    // console.log("value: ", value);
    if (value.trim()) {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <div className="shadow h-16 bg-white fixed w-full z-40">
      <div className="container mx-auto flex items-center px-4 justify-between">
        <div className="h-16 overflow-hidden">
          <Link to={"/"}>
            <img
              src={logo}
              className="h-full scale-150 mix-blend-multiply bg-transparent"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full border max-w-sm  justify-between rounded-full focus-within:shadow pl-4">
          <input
            type="text"
            placeholder="search product here..."
            className="focus:outline-none  w-full"
            value={searchValue}
            onChange={handleSearch}
          />
          <div className="bg-red-600 h-8 flex justify-center items-center text-white min-w-[50px] text-lg rounded-r-full">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                onClick={() => setShowMenu(!showMenu)}
                className={`cursor-pointer ${
                  user?.name
                    ? "bg-purple-900 px-3 py-1 text-white text-xl rounded-full"
                    : " text-3xl"
                }`}
              >
                {user?.name ? FisrtLaterOfName : <FaRegUserCircle />}
              </div>
            )}

            {showMenu && (
              <div className="hidden md:block top-10 absolute bg-white p-2 shadow-lg rounded-sm">
                {user?.role === ROLE?.ADMIN ? (
                  <nav>
                    <Link
                      onClick={() => setShowMenu(false)}
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap p-1 hover:bg-gray-100 text-sm"
                    >
                      Admin panel
                    </Link>
                  </nav>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="text-sm p-1 w-5 h-5 bg-red-600 text-white flex items-center justify-center rounded-full absolute -right-2 -top-2">
                {context?.countAddToCart}
              </div>
            </Link>
          )}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
