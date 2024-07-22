import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { ReactComponent as Option } from "../../../svgfile/option.svg";
import { ReactComponent as Popbox } from "../../../svgfile/Popbox.svg";
import { ReactComponent as Upboxuparrow } from "../../../svgfile/boxuparrow.svg";
import Createmainpagination from "../pagination/createmainpagination";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setIdstore,
  setDisplay,
  setIsloading,
  setData,
} from "../../../reduxfiles/inputredux";

function Tablebody({ formatDate, offset, showQuestion }) {
  const url =
    "https://exam-project-backend.vercel.app/questions/getallquestions";
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  // Memoized fetchData function
  const fetchData = useCallback(async () => {
    try {
      dispatch(setIsloading(true));
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      dispatch(setData(result));
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      dispatch(setIsloading(false));
    }
  }, [dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoized mapped data
  const sortedData = useMemo(
    () => inputs.Tablemanuplation.sortedData?.data,
    [inputs.Tablemanuplation.sortedData?.data]
  );

  // Memoized event handlers
  const handleEditClick = useCallback(
    (id) => {
      const questionToUpdate = sortedData.find(
        (question) => question._id === id
      );
      navigate("/admin/questionadd", {
        state: { itemToEdit: questionToUpdate },
      });
    },
    [navigate, sortedData]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://exam-project-backend.vercel.app/questions/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await response.json();
        fetchData();
      } catch (error) {
        console.error("Fetch operation error:", error);
      }
      navigate(0);
    },
    [fetchData]
  );
  console.log(sortedData);
  const handleClicktd = useCallback(
    (id) => {
      dispatch(setDisplay(!inputs.Tablemanuplation.display));
      dispatch(setIdstore(id));
    },
    [dispatch, inputs.Tablemanuplation.display]
  );

  // Outside click box close
  function useClickOutside(ref, callback) {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  }

  const calendarRef = useRef(null);
  useClickOutside(calendarRef, () => {
    dispatch(setDisplay(false));
  });

  return inputs.Tablemanuplation.isLoading ? (
    <tbody>
      <tr className="border-b border-gray-400">
        <td
          colSpan="5"
          className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
        >
          Loading ...
        </td>
      </tr>
    </tbody>
  ) : sortedData?.length === 0 ? (
    <tbody>
      <tr className="border-b border-gray-400">
        <td
          colSpan="5"
          className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
        >
          No data found
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody className="text-gray-600 text-md font-semibold w-full">
      {sortedData?.map((row, index) => (
        <tr
          key={index}
          className={`border-b border-gray-200 hover:bg-gray-200 w-full ${
            index % 2 !== 0 ? "bg-[#FAF5FF]" : "bg-slate-50"
          }`}
        >
          <td className="py-3 px-6    border">{offset + index + 1}</td>
          <td className="py-3 px-6   border">
            {row.question?.length <= 80
              ? row.question
              : `${row.question?.substring(0, 80)}.....`}
          </td>

          <td className="py-3 px-6  border">{formatDate(row.createdAt)}</td>

          <td className="py-3 px-6   border">
            <button
              className="text-blue-600 hover:text-blue-900 "
              onClick={() => showQuestion(row._id)}
            >
              <div className=" ">
                <Popbox />
              </div>
            </button>
          </td>
          <td className="relative  border">
            <button
              className="ml-4 hover:text-blue-900"
              onClick={() => handleClicktd(row._id)}
            >
              <div className="flex justify-center">
                <Option />
              </div>
            </button>

            {inputs.Tablemanuplation.display &&
              inputs.Tablemanuplation.idstore === row._id && (
                <div
                  ref={calendarRef}
                  role="tooltip"
                  className="absolute shadow-lg show bg-blue-400 z-10 border rounded   popover bs-popover-bottom "
                  style={{
                    top: "80%",
                    left: "54%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Upboxuparrow />
                  </div>
                  <div className="flex flex-col p-2">
                    <ul className="space-y-2">
                      <li
                        className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                        onClick={() => handleEditClick(row._id)}
                      >
                        Edit
                      </li>
                      <li
                        className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                        onClick={() => handleDelete(row._id)}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                </div>
              )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Tablebody;
