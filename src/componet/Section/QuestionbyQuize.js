import React, { useState, useEffect } from "react";
import Sidebar from "../fixdata/sidebar";
import Navbar from "../fixdata/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";

function QuestionbyQuize() {
  const [data, setData] = useState([]);
  // const { id } = useParams();
  const id = localStorage.getItem("ShowsectionId");
  const [arrrr, setArrrr] = useState([]);
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const token = localStorage.getItem("authToken");
  const url = "https://examsystem123.vercel.app/questions/getallquestions";
  const api = `https://examsystem123.vercel.app


/section/read/${id}`;
  useEffect(() => {
    fetchData();
    fetchApiData();
  }, []);
  console.log("new quize id", id);
  const fetchData = async () => {
    try {
      // setIsLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      console.log("object");
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  };
  const fetchApiData = async () => {
    try {
      const response = await fetch(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("resx", result);
      setCheckedIds(result.sectionmcqs.map((question) => question._id));
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  };
  const [hadcheck, setHadcheck] = useState([
    data.map((info, ind) => checkedIds.includes(info._id)),
  ]);
  const handleQuestion = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setArrrr((prevArrrr) => [...prevArrrr, { questionId: value }]);
    } else {
      setArrrr((prevArrrr) =>
        prevArrrr.filter((item) => item.questionId !== value)
      );
    }
  };

  console.log("src", arrrr);

  const handleSubmit = (e) => {
    e.preventDefault();
    const awr = arrrr.map((ele) => {
      const response = fetch(
        `https://examsystem123.vercel.app


/section/insert-questions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ele),
        }
      );

      if (response.ok) {
        console.log("Submitted successfully");
      } else {
        console.error("Submission error");
      }
      navigator(`/admin/Sectionmain`);
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className=" mx-auto px-4 py-5 flex-grow">
          <h1 className="mb-4 text-center text-2xl md:text-3xl font-semibold">
            Add New Question
          </h1>
          <div className="overflow-y-scroll max-h-[60vh] bg-white p-4 rounded shadow-md">
            <table className="w-full border-collapse">
              <tbody>
                {isLoading ? (
                  <tr>
                    <td className="text-center py-4">Loading...</td>
                  </tr>
                ) : (
                  data.map((info, ind) => (
                    <tr key={ind} className="border-b border-slate-200">
                      <td className="py-3 text-left px-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            value={info._id}
                            checked={
                              checkedIds.includes(info._id)
                                ? checkedIds.includes(info._id)
                                : hadcheck.data
                                    ?.map((ele) => ele._id)
                                    .includes(info._id)
                            }
                            onChange={handleQuestion}
                          />
                          <span className="font-bold text-lg text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {info.question?.length <= 40
                              ? info.question
                              : `${info.question?.substring(0, 100)}.....`}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
            <Link to="/admin/Sectionmain" className="ml-3">
              <button className="btn btn-secondary">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionbyQuize;
