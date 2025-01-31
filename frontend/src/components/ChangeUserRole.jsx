import React, { useState } from "react";
import ROLE from "../config/role";
import { IoClose } from "react-icons/io5";
import { updateUserApi } from "../helpers/Auth";
import { toast } from "react-toastify";
// import { json } from "express";

const ChangeUserRole = ({ name, email, role, onClose, userId, reCall }) => {
  const [userRole, setUserRole] = useState(role);

  const handleRole = (e) => {
    // console.log(e.target.value);
    setUserRole(e.target.value);
    // console.log(userRole, "ll");
  };

  const updateUser = async () => {
    try {
      const payload = {
        role: userRole,
        email, // Include email if necessary
        name, // Include name if necessary
        userId,
      };
      // const formateRole = JSON.stringify(userRole);
      const result = await updateUserApi(payload);
      if (result.success) {
        toast.success(result.message);
        onClose();
        reCall();
      }
      // console.log("user Updated: ", result);
    } catch (error) {
      console.log("Error user Updated: ", error);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center fixed z-10 top-0 right-0 bottom-0 left-0  bg-black bg-opacity-40">
      <div className="bg-white p-4 shadow-md w-full max-w-md mx-auto">
        <button onClick={() => onClose()} className="block ml-auto">
          <IoClose />
        </button>

        <h1 className="pb-4 font-medium text-lg">Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className="flex justify-between items-center my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleRole}
          >
            {Object.values(ROLE).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={updateUser}
          className="w-fit block mx-auto px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
