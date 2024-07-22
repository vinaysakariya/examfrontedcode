import React from "react";
import { ReactComponent as Sortbyname } from "../../../svgfile/sortbyname.svg";
import { setCurrentPage } from "../../../reduxfiles/quizredux";
import { useDispatch } from "react-redux";

function Tableheader({ sortOrder, setSortOrder }) {
  const dispatch = useDispatch();

  const handleSorting = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    dispatch(setCurrentPage(1));
  };

  return (
    // <thead>
    //   <tr className="border-b border-gray-400 text-black font-bold uppercase text-sm leading-normal w-full">
    //     <th className="border-x-2 border-gray-300 text-center px-6 lg:w-fit">
    //       Quiz Number
    //     </th>
    //     <th className="py-3 border-x-2 border-gray-300 text-left lg:w-full">
    //       <div
    //         className="flex justify-center items-center cursor-pointer"
    //         onClick={handleSorting}
    //       >
    //         <div>Quiz Name</div>
    //         <div className="ml-2">
    //           <Sortbyname className={sortOrder === "asc" ? "rotate-180" : ""} />
    //         </div>
    //       </div>
    //     </th>
    //     <th className="px-5 border-x-2 border-gray-300">KEY</th>
    //     <th className="px-5">Created Date</th>
    //     <th
    //       className="py-3 px-5 border-x-2 border-gray-300 text-left lg:w-fit"
    //       colSpan="2"
    //     >
    //       Action
    //     </th>
    //   </tr>
    // </thead>
    <thead>
      <tr className="bg-[#8A6FDF]  text-white uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">NUMBER</th>
        <th className="py-3 px-6 text-left">
          {" "}
          <div className="flex  cursor-pointer" onClick={handleSorting}>
            <div> Name</div>
            <div className="ml-2">
              <Sortbyname
                fill="white"
                className={sortOrder === "asc" ? "rotate-180" : ""}
              />
            </div>
          </div>
        </th>
        <th className="py-3 px-6 text-left">KEY</th>
        <th className="py-3 px-6 text-left">CREATED DATE</th>
        <th className="py-3 px-6 text-left">SHOW</th>
        <th className="py-3 px-6 text-left">Download</th>
        <th className="py-3 px-6 ">ACTION</th>
      </tr>
    </thead>
  );
}

export default Tableheader;
