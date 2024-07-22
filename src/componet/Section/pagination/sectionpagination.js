import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../reduxfiles/sectionredux";

function Createmainpagination() {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs2);

  // Memoized handlePageChange function
  const handlePageChange = useCallback(
    (pageNumber) => {
      if (
        pageNumber !== "..." &&
        pageNumber >= 1 &&
        pageNumber <= inputs.Tablemanuplation.totalPage
      ) {
        dispatch(setCurrentPage(pageNumber));
      }
    },
    [dispatch, inputs.Tablemanuplation.totalPage]
  );

  // Memoized getPageNumbers function
  const getPageNumbers = useCallback(() => {
    const pages = [];

    if (inputs.Tablemanuplation.totalPage <= 5) {
      for (let i = 1; i <= inputs.Tablemanuplation.totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2);

      if (inputs.Tablemanuplation.currentPage > 4) {
        pages.push("...");
      }

      if (
        inputs.Tablemanuplation.currentPage > 3 &&
        inputs.Tablemanuplation.currentPage <
          inputs.Tablemanuplation.totalPage - 2
      ) {
        pages.push(
          inputs.Tablemanuplation.currentPage - 1,
          inputs.Tablemanuplation.currentPage,
          inputs.Tablemanuplation.currentPage + 1
        );
      } else if (inputs.Tablemanuplation.currentPage <= 3) {
        pages.push(3, 4);
      } else {
        pages.push(
          inputs.Tablemanuplation.totalPage - 3,
          inputs.Tablemanuplation.totalPage - 2
        );
      }

      if (
        inputs.Tablemanuplation.currentPage <
        inputs.Tablemanuplation.totalPage - 3
      ) {
        pages.push("....");
      }

      pages.push(
        inputs.Tablemanuplation.totalPage - 1,
        inputs.Tablemanuplation.totalPage
      );
    }

    return pages;
  }, [inputs.Tablemanuplation.totalPage, inputs.Tablemanuplation.currentPage]);

  // Memoized pages array
  const pages = useMemo(() => getPageNumbers(), [getPageNumbers]);

  return (
    <div className="pagination m-2">
      <div
        className={`btn pagination-number font-bold  ${
          inputs.Tablemanuplation.currentPage === 1 ? "disabled" : ""
        }`}
        onClick={() =>
          inputs.Tablemanuplation.currentPage > 1 &&
          handlePageChange(inputs.Tablemanuplation.currentPage - 1)
        }
      >
        Prev
      </div>
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <div
            key={index}
            onClick={() => handlePageChange(page)}
            className={`btn pagination-number font-bold ${
              inputs.Tablemanuplation.currentPage === page
                ? "bg-[#8A6FDF] text-white"
                : ""
            }`}
          >
            {page}
          </div>
        ) : (
          <div
            key={index}
            className="pagination-ellipsis btn pagination-number font-bold"
          >
            ...
          </div>
        )
      )}
      <div
        className={`btn pagination-number font-bold ${
          inputs.Tablemanuplation.currentPage ===
          inputs.Tablemanuplation.totalPage
            ? "disabled"
            : ""
        }`}
        onClick={() =>
          inputs.Tablemanuplation.currentPage <
            inputs.Tablemanuplation.totalPage &&
          handlePageChange(inputs.Tablemanuplation.currentPage + 1)
        }
      >
        Next
      </div>
    </div>
  );
}

export default Createmainpagination;
