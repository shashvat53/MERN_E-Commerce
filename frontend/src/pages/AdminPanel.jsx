import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import ROLE from "../config/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  // console.log(user, "444");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-120px)] hidden md:flex">
      <aside className="w-full max-w-60 bg-white customShadow">
        <div className="h-32 relative flex justify-center items-center flex-col">
          <div
            className=" cursor-pointer 
              px-3 py-1  rounded-full
               text-6xl"
          >
            {<FaRegUserCircle />}
          </div>

          <p className="text-2xl font-semibold capitalize">
            {user && user?.name}
          </p>
          <p className="text-sm  capitalize">{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
