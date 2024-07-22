import React, { useMemo } from "react";
import { ReactComponent as Popbox } from "../../../svgfile/Popbox.svg";
import Createmainpagination from "../pagination/createmainpagination";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Tablebody({ offset }) {
  const inputs = useSelector((state) => state.inputs4);
  const Navigate = useNavigate();
  // Memoize sortedData to prevent unnecessary re-rendering
  const sortedData = useMemo(
    () => inputs?.Tablemanuplation?.sortedData?.data,
    [inputs.Tablemanuplation.sortedData.data]
  );

  // Memoize isLoading for conditional rendering
  const isLoading = useMemo(
    () => inputs?.Tablemanuplation?.isLoading,
    [inputs.Tablemanuplation.isLoading]
  );
  const handleResult = (id) => {
    localStorage.setItem("resultsectionId", id);

    Navigate("/admin/resultstudentmain");
  };
  console.log("sortedData", sortedData);
  return isLoading ? (
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
      {sortedData?.map((info, ind) => (
        <tr
          key={ind}
          className={`border-b border-gray-200 hover:bg-gray-200 w-full ${
            ind % 2 !== 0 ? "bg-[#FAF5FF]" : "bg-slate-50"
          }`}
        >
          <td className="py-3 px-6 text-left flex items-center">
            {offset + ind + 1}
          </td>
          <td className="py-3 px-6 text-left">{info.quizName}</td>
          <td className="py-3 px-6 text-left">
            <button
              className="text-blue-600 hover:text-blue-900"
              onClick={() => handleResult(info._id)}
            >
              <Popbox />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default Tablebody;
