import React, { useEffect, useState } from "react";
import singnLogo from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { SignUp } from "../helpers/Auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
  }, [user]);

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
    if (data?.password === data?.confirmPassword) {
      try {
        const responseData = await SignUp(data);
        console.log(responseData, "666");
        if (responseData?.success) {
          toast.success(responseData?.message);
          navigate("/login");
        }
        if (responseData?.error) {
          toast.error(responseData?.message);
        }
      } catch (error) {
        console.log(error, "888");
        toast.error(error?.message);
      }
    } else {
      toast.error("Please check confirm password.");
    }
  };
  return (
    <section>
      <div className="container mx-auto p-4  ">
        <div className="bg-white rounded-sm w-full max-w-sm m-auto  p-5">
          <div className="w-20 h-20 mx-auto">
            <img src={singnLogo} alt="signinLogo" className="rounded-full" />
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid ">
              <label>Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  className="bg-transparent outline-none w-full"
                />
              </div>
            </div>

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
            </div>

            <div className="grid ">
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex items-center ">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="bg-transparent outline-none w-full"
                />
                <div
                  className="text-xl cursor-pointer "
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  <span>
                    {showConfirmPass ? <FaEyeSlash /> : <IoEyeSharp />}
                  </span>
                </div>
              </div>
            </div>

            <button className="block rounded-full mt-6 w-full max-w-[150px] text-lg mx-auto bg-red-600 text-white py-2 px-4 hover:scale-110 transition-all">
              Sign up
            </button>
          </form>
          <p className="my-4 text-sm">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
