import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDatePicker from "../../../util/CoustomDatePicker";
import { serializedSelectionDatePicker } from "../../../util/utility";
import {
  setDateRangequize,
  toggleModalkey,
} from "../../../reduxfiles/quizredux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Delete } from "./../../../svgfile/delete.svg";
function Keyshow() {
  const inputs = useSelector((state) => state.inputs3);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iskey, isSetKey] = useState(false);
  const [keydata, setKeydata] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");
  const Featchapi = `examfrontedcode.vercel.app
/key/update/${inputs.Tablemanuplation.idkeystores}`;

  const handleDateRangePicker = (ranges) => {
    const serializedSelection = serializedSelectionDatePicker(ranges);
    dispatch(setDateRangequize([serializedSelection]));
  };

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const formatstartDate = inputs.dateRange[0].startDate;
  const formatendDate = inputs.dateRange[0].endDate;

  const keyGenerate = useCallback(async () => {
    try {
      const response = await fetch(
        "examfrontedcode.vercel.app/key/generatekey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizId: inputs.Tablemanuplation.idkeystores,
            starttime: formatDate(formatstartDate),
            endtime: formatDate(formatendDate),
          }),
        }
      );

      if (!response.ok) {
        isSetKey(true);

        throw new Error("Network response was not ok");
      }
      navigate(0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [dispatch, inputs.keyopenpop, formatstartDate, formatendDate, formatDate]);

  const closeBox = useCallback(async () => {
    dispatch(toggleModalkey(!inputs.keyopenpop));
    navigate(0);
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(Featchapi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setKeydata(result);
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
  }, [Featchapi]);

  useEffect(() => {
    if (inputs?.keyopenpop) {
      fetchData();
    }
  }, [inputs?.keyopenpop, fetchData]);

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await fetch(
        `examfrontedcode.vercel.app
/key/delete/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
    navigate(0);
  });
  console.log("v", keydata.data);
  return (
    inputs?.keyopenpop === true && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100 py-36 ">
        <div>
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
            <div className="bg-gray-200 w-3/4 md:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
              <div>
                <div
                  className="cursor-pointer flex justify-end"
                  onClick={closeBox}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="35px"
                    width="35px"
                  >
                    <path
                      fill="#64748B"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                    />
                  </svg>
                </div>
                {iskey == true ? (
                  <div className="text-red-700 font-bold text-xl flex justify-center mb-3">
                    Already KEY GENERATED
                  </div>
                ) : (
                  <div></div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="flex items-center justify-center">
                  <div className="mr-2 font-bold">Date :- </div>
                  <div className="bg-white rounded-xl p-2">
                    <div className="flex items-center">
                      <div>
                        <CustomDatePicker
                          inputs={inputs}
                          onDateRangeChange={handleDateRangePicker}
                        />
                      </div>
                      <div className="flex items-center ml-2">
                        <div className="text-gray-700 font-bold">
                          {formatendDate
                            ? formatDate(formatstartDate)
                            : "YY/MM/DD"}
                        </div>
                        <div className="mx-2 text-gray-500 font-bold">To</div>
                        <div className="text-gray-700 font-bold">
                          {formatendDate
                            ? formatDate(formatendDate)
                            : "YY/MM/DD"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={keyGenerate}
                  >
                    Key generate
                  </button>
                </div>
                {keydata.data && (
                  <table className="border-collapse border border-gray-200 w-full mt-4">
                    <thead>
                      <tr className="bg-gray-600 border text-white border-gray-200">
                        <th className="border border-white  px-4 py-2">KEY</th>
                        <th className="border border-white  px-4 py-2">
                          Remaining Time
                        </th>
                        <th className="border border-white  px-4 py-2">
                          Delete Key
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-gray-800 bg-white text-black font-bold ">
                        <td className="border border-black  px-4 py-2">
                          {keydata.data?.key}
                        </td>
                        <td className="border border-black px-4 py-2">
                          {" "}
                          {keydata.data?.Remaintime} Hour
                        </td>

                        <td
                          className="border border-black  px-4 py-2"
                          onClick={() => handleDelete(keydata.data?._id)}
                        >
                          <Delete />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Keyshow;
