import React, { useState, useEffect, useMemo, useCallback } from "react";

import Sidebar from "../../fixdata/sidebar";
import Navbar from "../../fixdata/navbar";

import CustomDatePicker from "../../../util/CoustomDatePicker";
import {
  setIsloading,
  setTotalPage,
  setSortedData,
  setCurrentPage,
  setDateRangeresult,
  setTotalCount,
} from "../../../reduxfiles/result";
import Tableheader from "./tableheader";
import Tablebody from "./tablebody";

import { useDispatch, useSelector } from "react-redux";

import { serializedSelectionDatePicker } from "../../../util/utility";
import Createmainpagination from "../pagination/studentpagination";

function Sectionmain({ setIsLoggedIn }) {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs4);
  const sortByOptions = useMemo(() => [10, 20, 30, 40, 50, 60], []);
  const urloFe = `https://exambackendcode.vercel.app



/search/getsearchAll`;
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const token = localStorage.getItem("authToken");
  const type = "quiz";
  console.log("token", token);
  const startDate = useMemo(
    () => formatDate(inputs.dateRange[0].startDate) + "T00:00:00.000Z",
    [inputs.dateRange]
  );
  const endDate = useMemo(
    () =>
      formatDate(inputs.dateRange[0].endDate || new Date()) + "T23:59:59.000Z",
    [inputs.dateRange]
  );

  // Memoized total page calculation
  const totalPage = useMemo(
    () => Math.ceil(inputs.Tablemanuplation.totalCount / limit),
    [inputs.Tablemanuplation.totalCount, limit]
  );

  // Dispatch total page on totalPage change
  useEffect(() => {
    dispatch(setTotalPage(totalPage));
  }, [dispatch, totalPage]);

  // Fetch data with memoized fetch function
  const fetchsortData = useCallback(async () => {
    try {
      dispatch(setIsloading(true));

      const params = new URLSearchParams({
        search,
        limit,
        sortBy: "createdAt",
        sortOrder,
        startDate,
        endDate,
        type,
        offset: inputs.Tablemanuplation.currentPage * limit - limit,
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
      dispatch(setTotalCount(result.totalCount));
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      dispatch(setIsloading(false));
    }
  }, [
    dispatch,
    endDate,
    limit,
    search,
    sortOrder,
    startDate,
    type,
    inputs.Tablemanuplation.currentPage,
  ]);

  // Effect to fetch data on component mount and when dependencies change
  useEffect(() => {
    fetchsortData();
  }, [fetchsortData]);

  // Handler to update limit and reset page
  const handleLimit = useCallback(
    (e) => {
      setLimit(Number(e.target.value));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  // Handler to update search and reset page
  const handleChange = useCallback(
    (e) => {
      setSearch(e.target.value);
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleDateRangePicker = (ranges) => {
    const serializedSelection = serializedSelectionDatePicker(ranges);
    dispatch(setDateRangeresult([serializedSelection]));
  };

  return (
    <div className="App bg">
      <div className="flex">
        <Sidebar />
        <div className="w-full bg-[#EEEEEE] ml-64">
          <div>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
          </div>

          <div className="bg-white rounded shadow-md m-4 p-4 ">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">Result</div>
            </div>
            <div className="flex justify-between items-center mb-2 mt-3">
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
                      <div className="text-gray-700 font-bold">
                        {inputs.dateRange[0].startDate
                          ? formatDate(inputs.dateRange[0].startDate)
                          : "YY/MM/DD"}
                      </div>
                      <div className="mx-2 text-gray-500 font-bold">To</div>
                      <div className="text-gray-700 font-bold">
                        {inputs.dateRange[0].endDate
                          ? formatDate(inputs.dateRange[0].endDate)
                          : "YY/MM/DD"}
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
            </div>

            <div>
              <table className="min-w-full bg-white border border-gray-200">
                <Tableheader
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />

                <Tablebody
                  formatDate={formatDate}
                  offset={inputs.Tablemanuplation.currentPage * limit - limit}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sectionmain;
