import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../fixdata/sidebar";
import Navbar from "../fixdata/navbar";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function QuestionAdd({ setIsLoggedIn }) {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs);
  const token = localStorage.getItem("authToken");
  const initialInputData = {
    _id: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  };

  const [inputquedata, setInputquedata] = useState(initialInputData);

  useEffect(() => {
    if (location.state && location.state.itemToEdit) {
      setInputquedata(location.state.itemToEdit);
    }
  }, [location.state]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputquedata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const createApi =
        "https://exam-project-backend.vercel.app/questions/create";
      const updateApi = `https://exam-project-backend.vercel.app/questions/update/${inputquedata._id}`;
      try {
        const api = inputquedata._id ? updateApi : createApi;
        const response = await fetch(api, {
          method: inputquedata._id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputquedata),
        });
        setInputquedata(initialInputData); // Reset form fields after submission
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate("/admin/createmain");
      } catch (error) {
        console.error("Fetch operation error:", error);
      }
    },
    [inputquedata, navigate, initialInputData]
  );

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full ">
          <div>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
          </div>
          <form className="w-50 mx-auto mt-5 mb-4" onSubmit={handleSubmit}>
            <h1 className="mb-4">Add New Question</h1>

            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <input
                type="text"
                name="question"
                value={inputquedata.question}
                onChange={handleChange}
                className="form-control"
                placeholder="Question*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option1" className="form-label">
                Option 1
              </label>
              <input
                type="text"
                name="option1"
                value={inputquedata.option1}
                onChange={handleChange}
                className="form-control"
                placeholder="Option 1*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option2" className="form-label">
                Option 2
              </label>
              <input
                type="text"
                name="option2"
                value={inputquedata.option2}
                onChange={handleChange}
                className="form-control"
                placeholder="Option 2*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option3" className="form-label">
                Option 3
              </label>
              <input
                type="text"
                name="option3"
                value={inputquedata.option3}
                onChange={handleChange}
                className="form-control"
                placeholder="Option 3*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="option4" className="form-label">
                Option 4
              </label>
              <input
                type="text"
                name="option4"
                value={inputquedata.option4}
                onChange={handleChange}
                className="form-control"
                placeholder="Option 4*"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Answer
              </label>
              <select
                name="answer"
                value={inputquedata.answer}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Answer*</option>
                <option value="option1">{inputquedata.option1}</option>
                <option value="option2">{inputquedata.option2}</option>
                <option value="option3">{inputquedata.option3}</option>
                <option value="option4">{inputquedata.option4}</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary mr-5">
              Submit
            </button>
            <Link to="/admin/createmain">
              <button type="button" className="btn btn-primary">
                Back
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default QuestionAdd;
