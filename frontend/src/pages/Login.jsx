import React, { useContext, useEffect, useState } from "react";
import singnLogo from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Loginapi } from "../helpers/Auth";
import { toast } from "react-toastify";
import Context from "../context";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user);

  const { fetchUserData, fetchCountAddToCartProduct } = useContext(Context);

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user]);

  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // console.log(data, "1");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data, "submit");
    try {
      const responseData = await Loginapi(data);
      // console.log(result);
      // console.log("responseData: ", responseData);
      if (responseData?.error) {
        toast.error(responseData?.message);
      }
      if (responseData?.success) {
        toast.success(responseData?.message);
        navigate("/");
        fetchUserData();
        fetchCountAddToCartProduct();
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <section>
      <div className="container mx-auto p-4 md:pt-16  ">
        <div className="bg-white rounded-sm w-full max-w-sm m-auto  p-5">
          <div className="w-20 h-20 mx-auto">
            <img src={singnLogo} alt="signinLogo" className="rounded-full" />
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid ">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>
            <div className="grid ">
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex items-center ">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="bg-transparent outline-none w-full"
                />
                <div
                  className="text-xl cursor-pointer "
                  onClick={() => setShowPass(!showPass)}
                >
                  <span>{showPass ? <FaEyeSlash /> : <IoEyeSharp />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="text-sm w-fit ml-auto mt-1 hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>

            <button className="block rounded-full mt-6 w-full max-w-[150px] text-lg mx-auto bg-red-600 text-white py-2 px-4 hover:scale-110 transition-all">
              Login
            </button>
          </form>
          <p className="my-4 text-sm">
            Dont have an account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
