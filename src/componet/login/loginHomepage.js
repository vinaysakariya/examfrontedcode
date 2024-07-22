import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Choose Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/loginadminpage"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-center transition duration-300 block"
          >
            Admin
          </Link>

          <Link
            to="/loginstudent"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-center transition duration-300 block"
          >
            Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
