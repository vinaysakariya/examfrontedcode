import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../fixdata/sidebar";
import Navbar from "../fixdata/navbar";

function Main({ setIsLoggedIn }) {
  const [recentStudunt, setRecentStudent] = useState([]);
  const [topStudunt, setTopStudent] = useState([]);
  const token = localStorage.getItem("authToken");
  const RecentStudentApi = "examfrontedcode.vercel.app/result/recentResults";
  const TopStudentApi = "examfrontedcode.vercel.app/result/topTenResults";

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(RecentStudentApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setRecentStudent(result);
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  });
  const fetchDatas = useCallback(async () => {
    try {
      const response = await fetch(TopStudentApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result, "result");
      setTopStudent(result);
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  });
  useEffect(() => {
    fetchData();
    fetchDatas();
  }, []);
  return (
    <div className="App">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="w-full bg-[#EEEEEE] md:ml-64   h-full">
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-center text-blue-700">Total Questions</p>
                <div className="flex justify-center mt-3">
                  <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl font-bold">
                    4
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-center text-blue-700">Total Quiz</p>
                <div className="flex justify-center mt-3">
                  <div className="bg-green-500 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl font-bold">
                    4
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-center text-blue-700">Total Sections</p>
                <div className="flex justify-center mt-3">
                  <div className="bg-purple-500 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl font-bold">
                    4
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-center text-blue-700">Total Results</p>
                <div className="flex justify-center mt-3">
                  <div className="bg-pink-500 w-10 h-10 flex items-center justify-center rounded-full text-white text-xl font-bold">
                    4
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 p-5">
            <div className="bg-white rounded-lg shadow-md p-4 w-full lg:w-3/4">
              <h2 className="text-lg font-semibold text-blue-700">
                Top Student
              </h2>
              <table className="w-full mt-3">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 bg-blue-100 text-blue-700">
                      Number
                    </th>
                    <th className="border px-4 py-2 bg-green-100 text-green-700">
                      Name
                    </th>
                    <th className="border px-4 py-2 bg-yellow-100 text-yellow-700">
                      Email-id
                    </th>
                    <th className="border px-4 py-2 bg-purple-100 text-purple-700">
                      Exam Name
                    </th>
                    <th className="border px-4 py-2 bg-pink-100 text-pink-700">
                      Total Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topStudunt?.data?.map((index, ind) => (
                    <tr key={ind}>
                      <td className="border px-4 py-2 bg-blue-50 text-blue-700">
                        {ind + 1}
                      </td>
                      <td className="border px-4 py-2 bg-green-50 text-green-700">
                        {index.firstname} {index.lastname}
                      </td>
                      <td className="border px-4 py-2 bg-yellow-50 text-yellow-700">
                        {index.email}
                      </td>
                      <td className="border px-4 py-2 bg-purple-50 text-purple-700">
                        {index.QuizName}
                      </td>
                      <td className="border px-4 py-2 bg-pink-50 text-pink-700">
                        {index.result}/{index.TotalResult}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-100 shadow-lg p-4 rounded-lg w-full lg:w-1/4">
              <h2 className="text-lg font-semibold text-blue-700 mb-4">
                Recent Student
              </h2>
              <div className="space-y-4">
                {recentStudunt?.data?.map((ind, i) => (
                  <div key={i} className="p-4 bg-teal-100 rounded-lg shadow">
                    <div className="text-teal-700 font-medium">
                      Name: {ind.firstname} {ind.lastname}
                    </div>
                    <div className="text-teal-500">
                      Total Result: {ind.result}/{ind.TotalResult}
                    </div>
                    <div className="text-red-500">Status: {ind.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
