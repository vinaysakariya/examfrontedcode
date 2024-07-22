import React, { useMemo, useCallback } from "react";
import { ReactComponent as Sortbyname } from "../../../svgfile/sortbyname.svg";

function Tableheader({ sortOrder, setSortOrder }) {
  const toggleSortOrder = useCallback(() => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }, [sortOrder, setSortOrder]);

  const rotatedClass = useMemo(
    () => (sortOrder === "asc" ? "rotate-180" : ""),
    [sortOrder]
  );

  return (
    <thead>
      <tr className="bg-[#8A6FDF] text-white uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">NUMBER</th>
        <th className="py-3 px-6 text-left">
          <div className="flex cursor-pointer" onClick={toggleSortOrder}>
            <div>Section Name</div>
            <div className="ml-2">
              <Sortbyname
                fill="white"
                className={sortOrder === "asc" ? "rotate-180" : ""}
              />
            </div>
          </div>
        </th>
        <th className="py-3 px-6 text-left">CREATED DATE</th>
        <th className="py-3 px-6 text-left">Section Code</th>
        <th className="py-3 px-6 text-left">SHOW</th>
        <th className="py-3 px-6">ACTION</th>
      </tr>
    </thead>
  );
}

export default Tableheader;
