import React from "react";

function studentloging() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96">
        <h1 className="text-green-500 text-3xl mb-6">Student Login</h1>

        <form>
          <label
            htmlFor="first"
            className="text-left text-gray-700 font-bold block "
          >
            FirstName:
          </label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Enter your FirstName"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
          />
          <label
            htmlFor="last"
            className="text-left text-gray-700 font-bold block "
          >
            LastName:
          </label>
          <input
            type="text"
            id="last"
            name="last"
            placeholder="Enter your LastName"
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
            Key
          </label>
          <input
            type="text"
            id="key"
            name="key"
            placeholder="Enter your key"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
            required
          />
          <div className="flex justify-center mt-3">
            <button type="submit" className="btn btn-primary btn-block">
              Loging
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default studentloging;
