import React, { useMemo } from "react";
import { ReactComponent as Sortbyname } from "../../../svgfile/sortbyname.svg";
import { setCurrentPage } from "../../../reduxfiles/resultstudentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Tableheader({ sortOrder, setSortOrder, resultBy, setStatus, status }) {
  const dispatch = useDispatch();

  const inputs = useSelector((state) => state.inputs5);
  const handleSorting = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    dispatch(setCurrentPage(1));
  };
  const handleresult = () => {
    setStatus((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    dispatch(setCurrentPage(1));
  };
  const sortedData = useMemo(
    () => inputs?.Tablemanuplation?.sortedData,
    [inputs.Tablemanuplation.sortedData]
  );

  return (
    <thead>
      <tr className="bg-[#8A6FDF]  text-white uppercase text-sm leading-normal">
        <th className="py-3 px-6 text-left">NUMBER</th>
        <th className="py-3 px-6 text-left">
          <div className="flex cursor-pointer" onClick={handleSorting}>
            <div>Name</div>
            <div className="ml-2">
              <Sortbyname
                fill="white"
                className={sortOrder === "asc" ? "rotate-180" : ""}
              />
            </div>
          </div>
        </th>
        <th className="py-3 px-6 text-left">Email ID</th>
        <th className="py-3 px-6 text-left">Exam Date</th>
        {resultBy === "Section" ? (
          sortedData &&
          sortedData[0]?.sectionwiseTotalResult?.map((i, idx) => (
            <th key={idx} className="py-3 px-6 text-left">
              {i.sectionname}
            </th>
          ))
        ) : (
          <th className="py-3 px-6 text-left">Total Result</th>
        )}
        <th className="py-3 px-6 text-left">
          <div className="flex cursor-pointer" onClick={handleresult}>
            <div>Status</div>
            <div className="ml-2">
              <Sortbyname
                fill="white"
                className={status === "asc" ? "rotate-180" : ""}
              />
            </div>
          </div>
        </th>
        <th className="py-3 px-6 text-left">Download</th>
      </tr>
    </thead>
  );
}
export default Tableheader;
