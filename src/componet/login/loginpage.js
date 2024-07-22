// student Login

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../cssfile/Login.css";

const Loginpage = () => {
  const [inputlogindata, setInputlogindata] = useState({
    userEmail: "",
    firstname: "",
    lastname: "",
    userkey: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputlogindata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log("inputlogindata", inputlogindata);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = "https://exam-project-backend.vercel.app/auth/userLogin";
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputlogindata),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("paperQuizId", result.existKey.quizId);
        localStorage.setItem("authTokenstu", result.token); // Save token to localStorage
        setInputlogindata(result);
        setErrorMessage("");

        navigate("/userpages/quiz-start");
      } else {
        console.log("sdsdsdsds");
        setErrorMessage("Invalid email or password");
        setInputlogindata({
          userEmail: "",
          firstname: "",
          lastname: "",
          userkey: "",
        });
      }
    } catch (error) {
      console.error("Fetch operation error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="main bg-white rounded-lg shadow-md p-10 w-96">
        <div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <h1 className="text-green-500 text-3xl mb-6">Student Login</h1>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="first"
              className="text-left text-gray-700 font-bold block "
            >
              FirstName:
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={handleChange}
              value={inputlogindata.firstname}
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
              id="lastname"
              name="lastname"
              onChange={handleChange}
              value={inputlogindata.lastname}
              placeholder="Enter your lastname"
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
              id="userEmail"
              name="userEmail"
              onChange={handleChange}
              value={inputlogindata.userEmail}
              placeholder="Enter your Email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
            />

            <label
              htmlFor="userkey"
              className="text-left text-gray-700 font-bold block mt-4"
            >
              Key
            </label>
            <input
              type="text"
              id="userkey"
              name="userkey"
              onChange={handleChange}
              value={inputlogindata.userkey}
              placeholder="Enter your key"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 mt-1"
              required
            />
            <div className="flex w-100 mt-3">
              <button type="submit" className="btn btn-primary w-100 btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
