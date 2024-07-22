import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../fixdata/sidebar";
import Navbar from "../../fixdata/navbar";
import Addquiz from "../addquestion";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleModal,
  setIsloading,
  setTotalPage,
  setSortedData,
  setCurrentPage,
  setIdstores,
  setDateRange,
  toggleuploadModal,
} from "../../../reduxfiles/inputredux";

import CustomDatePicker from "../../../util/CoustomDatePicker";
import Showquestionbox from "./showquestionbox";
import Uplodfile from "./uplodfile";
import Tableheader from "./tableheader";
import Tablebody from "./tablebody";
import { serializedSelectionDatePicker } from "../../../util/utility";
import Createmainpagination from "../pagination/createmainpagination";

function Createmain({ setIsLoggedIn }) {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const sortByOptions = useMemo(() => [10, 20, 30, 40, 50, 60], []);

  const urloFe = useMemo(
    () => `https://exam-project-backend.vercel.app/search/getsearchAll`,
    []
  ); // Memoize urloFe
  // ****************  date formate  ********************

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [limit, setLimit] = useState(10);
  const sortBy = "createdAt";
  let type = "question";
  const startDate = useMemo(
    () => formatDate(inputs.dateRange[0].startDate) + "T00:00:00.000Z",
    [inputs.dateRange]
  );
  const endDate = useMemo(
    () =>
      formatDate(inputs.dateRange[0].endDate || new Date()) + "T23:59:59.000Z",
    [inputs.dateRange]
  );

  const formatstartDate = inputs.dateRange[0].startDate;
  const formatendDate = inputs.dateRange[0].endDate;

  // *********search*********
  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");

  // ************pagination

  const indexOfLastRow = useMemo(
    () => inputs.Tablemanuplation.currentPage * limit,
    [inputs.Tablemanuplation.currentPage, limit]
  );
  const offset = useMemo(() => indexOfLastRow - limit, [indexOfLastRow, limit]);

  const totalPage = useMemo(
    () => Math.ceil(inputs.Tablemanuplation.sortedData.totalCount / limit),
    [inputs.Tablemanuplation.sortedData.totalCount, limit]
  );
  useEffect(() => {
    dispatch(setTotalPage(totalPage));
  }, [dispatch, totalPage]);

  //********************************************************* */

  const handleLimit = useCallback(
    (e) => {
      setLimit(e.target.value);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  const handleChange = useCallback(
    (e) => {
      setSearch(e.target.value);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  // ************ sort data api **************************

  const fetchsortData = useCallback(async () => {
    try {
      dispatch(setIsloading(true));

      const params = new URLSearchParams({
        search,
        limit,
        sortBy,
        sortOrder,
        startDate,
        endDate,
        type,
        offset,
      });

      const response = await fetch(`${urloFe}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      dispatch(setSortedData(result));
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      dispatch(setIsloading(false));
    }
  }, [
    dispatch,
    search,
    limit,
    offset,
    type,
    sortBy,
    sortOrder,
    startDate,
    endDate,
    urloFe,
  ]);

  useEffect(() => {
    fetchsortData();
  }, [fetchsortData]);

  // ************ show question ************************
  const showQuestion = useCallback(
    (id) => {
      dispatch(setIdstores(id));
      dispatch(toggleModal(!inputs.openpop));

      // localStorage.setItem("QuizeId", id);
    },
    [dispatch, inputs.openpop]
  );

  const showUploadbox = useCallback(() => {
    dispatch(toggleuploadModal(!inputs.openuplod));
  }, [dispatch, inputs.openuplod]);

  const handleDateRangePicker = (ranges) => {
    const serializedSelection = serializedSelectionDatePicker(ranges);
    dispatch(setDateRange([serializedSelection]));
  };
  const data = useMemo(
    () => inputs.Tablemanuplation.sortedData?.data,
    [inputs.Tablemanuplation.sortedData?.data]
  );
  const exportToExcel = () => {
    // Generate a random file name
    const fileName = `data_${Math.random().toString(36).substr(2, 9)}.xlsx`;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate a buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: "application/octet-stream" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };
  return (
    <div className="App bg-[#EEEEEE]">
      <div className="flex">
        <Sidebar />
        <div className="w-full  ml-64 ">
          <div>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
          </div>

          <div className="bg-white  rounded shadow-md m-4 p-4 ">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">QUESTION</div>
              <div className="flex space-x-2">
                <button
                  className="bg-[#8A6FDF] hover:bg-[#7451f2] text-white px-4 py-2 rounded"
                  onClick={showUploadbox}
                >
                  Import
                </button>
                <button
                  className="bg-[#8A6FDF] text-white px-4 py-2 rounded hover:bg-[#7451f2]"
                  onClick={exportToExcel}
                >
                  Export
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2 mt-5">
              <div className="flex items-center">
                <div className="mr-2 font-bold">Date :- </div>
                <div className=" bg-white   border rounded p-2">
                  <div className="flex items-center">
                    <div>
                      <CustomDatePicker
                        inputs={inputs}
                        onDateRangeChange={handleDateRangePicker}
                      />
                    </div>
                    <div className="flex items-center ml-2">
                      <div className="text-gray-700 font-bold ">
                        {formatendDate
                          ? formatDate(formatstartDate)
                          : "YY/MM/DD"}
                      </div>
                      <div className="mx-2 text-black font-bold">To</div>
                      <div className="text-gray-700 font-bold">
                        {formatendDate ? formatDate(formatendDate) : "YY/MM/DD"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-2 md:mb-0">
                <label className="font-bold ml-2">Search: </label>
                <input
                  type="text"
                  className="w-full md:w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 md:ml-4"
                  placeholder="Search"
                  value={search}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <span className="fw-bold me-2">Sort by :</span>
                <select
                  onChange={handleLimit}
                  className="border border-gray-800"
                >
                  {sortByOptions.map((sortByOption, index) => (
                    <option key={index}>{sortByOption}</option>
                  ))}
                </select>
              </div>
              <Link to="/admin/questionadd">
                <div className="mr-5 cursor-pointer ">
                  <Addquiz />
                </div>
              </Link>
            </div>

            <div>
              <table className="min-w-full bg-white ">
                <Tableheader
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />

                <Tablebody
                  formatDate={formatDate}
                  offset={offset}
                  showQuestion={showQuestion}
                />
              </table>
            </div>
            {inputs.Tablemanuplation.isLoading === false && (
              <div className="flex justify-between items-center mt-2 z-0">
                <span>
                  Page{" "}
                  {inputs.Tablemanuplation.sortedData?.data?.length === 0
                    ? 0
                    : inputs.Tablemanuplation.currentPage}{" "}
                  of {totalPage}
                </span>

                <div className="flex space-x-2">
                  <Createmainpagination />
                </div>
              </div>
            )}
            <Showquestionbox showQuestion={showQuestion} />
            <Uplodfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createmain;
