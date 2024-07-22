import React from "react";
import { Link } from "react-router-dom";

function adminsignup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96">
        <h1 className="text-green-500 text-3xl mb-6">Admin Signup</h1>

        <form>
          <label
            htmlFor="first"
            className="text-left text-gray-700 font-bold block "
          >
            Username:
          </label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Enter your Username"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
          <label
            htmlFor="first"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Email:
          </label>
          <input
            type="email"
            id="first"
            name="first"
            placeholder="Enter your Username"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
          <label
            htmlFor="password"
            className="text-left text-gray-700 font-bold block mt-4"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
          />

          <div className="flex justify-between mt-3">
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
            <Link to="/admin-login" className="font-semibold text-xl">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default adminsignup;
