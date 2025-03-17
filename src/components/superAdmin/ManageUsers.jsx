import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../reduxSystem/slices/getAllUsersSlice";
import {
  deleteUser,
  resetDeleteUserState,
} from "../../reduxSystem/slices/deleteUserSlice";
import {
  banOrUnbanUser,
  resetBanState,
} from "../../reduxSystem/slices/banUserSlice";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.getAllUsersState);
  const { isUserDeleted } = useSelector((state) => state.deleteUserState);
  const { isBanned } = useSelector((state) => state.banUserState);

  // 🔹 حالة البحث
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 تحديث البحث عند الكتابة

  // 🔹 جلب المستخدمين بناءً على البحث
  useEffect(() => {
    dispatch(fetchAllUsers(searchQuery)).then(() => {
      dispatch(resetDeleteUserState());
      dispatch(resetBanState());
    });
  }, [dispatch, isUserDeleted, isBanned, searchQuery]); // إضافة `searchQuery` لتحديث النتائج تلقائيًا عند التغيير

  // 🔹 تأكيد وإزالة المستخدم
  const handleRemoveUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire("Deleted!", "The user has been removed.", "success");
      }
    });
  };

  // 🔹 تأكيد حظر/إلغاء حظر المستخدم
  const handleBanUser = (userObj) => {
    const action = userObj.isBanned ? "unban" : "ban";
    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: userObj.isBanned ? "#3085d6" : "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: userObj.isBanned ? "Yes, Unban" : "Yes, Ban",
    }).then((result) => {
      if (result.isConfirmed) {
        const targetUserId = userObj._id;
        const isBanned = !userObj.isBanned;
        dispatch(banOrUnbanUser({ targetUserId, isBanned }));

        Swal.fire(
          userObj.isBanned ? "Unbanned!" : "Banned!",
          `The user has been ${action}ned.`,
          "success"
        );
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* 🔹 شريط البحث */}
      <input
        type="text"
        placeholder="Search by name..."
        className="mb-6 px-4 py-2 w-80 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {users && users.length > 0 ? (
            users.map((user) => {
              const initial = `${user.lname[0]}${user.fname[0]}`.toUpperCase();

              return (
                <div
                  key={user._id}
                  className="bg-white shadow-lg rounded-lg p-6 w-80 text-center"
                >
                  {/* صورة رمزية بالحروف الأولى */}
                  <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 text-3xl font-bold">
                    {initial}
                  </div>
                  <h2 className="text-xl font-semibold">
                    {user.fname.charAt(0).toUpperCase() + user.fname.slice(1)}{" "}
                    {user.lname.charAt(0).toUpperCase() + user.lname.slice(1)}
                  </h2>
                  <p className="text-gray-600">{user.userType}</p>
                  <div className="mt-4 flex justify-center gap-4 flex-col">
                    <button
                      onClick={() => handleBanUser(user)}
                      className={`text-white px-4 py-2 rounded-lg duration-300 ${
                        user.isBanned
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {user.isBanned ? "Unban User" : "Ban User"}
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Remove User
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
