import React, { useCallback } from "react";
import { ReactComponent as Sortbyname } from "../../../svgfile/sortbyname.svg";
import { setCurrentPage } from "../../../reduxfiles/quizredux";
import { useDispatch } from "react-redux";

function Tableheader({ sortOrder, setSortOrder }) {
  const dispatch = useDispatch();

  const handleSorting = useCallback(() => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    dispatch(setCurrentPage(1));
  }, [dispatch, setSortOrder]);

  return (
    <thead>
      <tr className="bg-[#8A6FDF]  text-white uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">NUMBER</th>
        <th className="py-3 px-6 text-left">
          {" "}
          <div className="flex  cursor-pointer" onClick={handleSorting}>
            <div>Quiz Name</div>
            <div className="ml-2">
              <Sortbyname
                fill="white"
                className={sortOrder === "asc" ? "rotate-180" : ""}
              />
            </div>
          </div>
        </th>

        <th className="py-3 px-6 text-left">SHOW</th>
      </tr>
    </thead>
  );
}

export default Tableheader;
