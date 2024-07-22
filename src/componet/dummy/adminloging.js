// App.js
import React from "react";
import { Link } from "react-router-dom";

function Adminloging() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96">
        <h1 className="text-green-500 text-3xl mb-6">Admin Login</h1>

        <form>
          <label
            htmlFor="first"
            className="text-left text-gray-700 font-bold block"
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

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        <Link to="/adminsignup">
          <p className="text-gray-600 mt-4">
            Not registered?
            <a href="#" className="text-green-500 ml-1 hover:underline">
              Create an account
            </a>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Adminloging;
