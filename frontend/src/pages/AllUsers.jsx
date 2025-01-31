import React, { useEffect, useState } from "react";
import { allUsersApi } from "../helpers/Auth";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAlluser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserData, setUpdateUserData] = useState({
    name: "",
    email: "",
    role: "",
    userId: "",
  });

  const fetchAllUser = async () => {
    try {
      const res = await allUsersApi();
      // console.log(res, "allUsers777");
      if (res.success) {
        setAlluser(res.data);
      }
      if (res.error) {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable">
        <thead className="">
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((user, index) => (
            <tr key={user?._id}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <button
                  onClick={() => {
                    setUpdateUserData(user), setOpenUpdateRole(true);
                  }}
                  className="p-2 bg-green-100 cursor-pointer hover:bg-green-500 hover:text-white rounded-full"
                >
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserData.name}
          email={updateUserData.email}
          role={updateUserData.role}
          userId={updateUserData._id}
          reCall={fetchAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
