import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <h1 className="text-3xl font-bold">👤 Profile</h1>
      {user ? (
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-red-500">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
