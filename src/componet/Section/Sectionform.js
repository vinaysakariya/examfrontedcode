import React, { useState, useEffect, useCallback, useMemo } from "react";
import Sidebar from "../fixdata/sidebar";
import Navbar from "../fixdata/navbar";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Sectionform({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");
  const [inputSectiondata, setInputSectiondata] = useState({
    sectionname: "",
    sectionpassingMarks: "",
  });

  useEffect(() => {
    if (location.state && location.state.itemToEdit) {
      setInputSectiondata(location.state.itemToEdit);
    }
  }, [location.state]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputSectiondata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createApi = "https://examsystem123.vercel.app
/section/create";
    const updateApi = `https://examsystem123.vercel.app
/section/update/${inputSectiondata._id}`;

    try {
      const api = inputSectiondata._id ? updateApi : createApi;
      const response = await fetch(api, {
        method: inputSectiondata._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputSectiondata),
      });
      if (!response.ok) {
        return response.json().then((errorData) => {
          setError(errorData);
        });
      }
      // return response.json();

      // if (!response.ok) {
      //   (response) => response.json();
      //   console.log("ffggfr:", response);
      //   throw new Error("Network response was not ok");
      // }

      setInputSectiondata({
        sectionname: "",
        sectionpassingMarks: "",
      });

      navigate("/admin/Sectionmain");
    } catch (error) {
      console.log("Fetch operation error:", error);
    }
  };

  return (
    // <div className="flex">
    //   <Sidebar />
    //   <div className="w-full">
    //     <div>
    //       <Navbar setIsLoggedIn={setIsLoggedIn} />
    //     </div>

    //     <form className="w-50 mx-auto mt-5 mb-4" onSubmit={handleSubmit}>
    //       {error && (
    //         <div className="flex items-center text-xl bg-red-100 p-2 text-red-700 mb-5">
    //           {error.message}
    //         </div>
    //       )}
    //       <h1 className="mb-4">Add New Section</h1>

    //       <div className="mb-3">
    //         <label htmlFor="question" className="form-label">
    //           Section-Name
    //         </label>
    //         <input
    //           type="text"
    //           name="sectionname"
    //           value={inputSectiondata.sectionname}
    //           onChange={handleChange}
    //           className="form-control"
    //           placeholder="Question*"
    //           required
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <label htmlFor="number" className="form-label">
    //           Passing Marks
    //         </label>
    //         <input
    //           type="number"
    //           name="sectionpassingMarks"
    //           value={inputSectiondata.sectionpassingMarks}
    //           onChange={handleChange}
    //           className="form-control"
    //           placeholder="passing marks"
    //           required
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-primary">
    //         Submit
    //       </button>
    //       <Link to="/admin/Sectionmain" className="ml-4">
    //         <button type="button" className="btn btn-primary">
    //           Back
    //         </button>
    //       </Link>
    //     </form>
    //   </div>
    // </div>
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <div className="">
          <form
            className="w-full max-w-md mx-auto mt-5 mb-4 p-8 bg-white shadow-lg rounded-lg "
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="flex items-center text-xl bg-red-100 p-2 text-red-700 mb-5">
                {error.message}
              </div>
            )}
            <h1 className="text-2xl font-bold   my-5">Add New Section</h1>
            <div className="mb-5">
              <label
                htmlFor="sectionname"
                className="block text-sm font-medium text-gray-700"
              >
                Section Name
              </label>
              <input
                type="text"
                name="sectionname"
                value={inputSectiondata.sectionname}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Section Name*"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="sectionpassingMarks"
                className="block text-sm font-medium text-gray-700"
              >
                Passing Marks
              </label>
              <input
                type="number"
                name="sectionpassingMarks"
                value={inputSectiondata.sectionpassingMarks}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Passing Marks"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link to="/admin/Sectionmain" className="ml-4">
                <button type="button" className="btn btn-secondary">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sectionform;
