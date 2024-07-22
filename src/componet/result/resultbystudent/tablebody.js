import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Download } from "../../../svgfile/download.svg";
import html2pdf from "html2pdf.js";
import ResultDatas from "./../../modules/ResultData/ResultData";

function Tablebody({ offset, formatDate, resultBy }) {
  const inputs = useSelector((state) => state.inputs5);
  const [ResultId, setResultIds] = useState();
  const sortedData = useMemo(() => {
    return Array.isArray(inputs?.Tablemanuplation?.sortedData)
      ? inputs.Tablemanuplation.sortedData
      : [];
  }, [inputs.Tablemanuplation.sortedData]);

  const token = localStorage.getItem("authToken");

  const [resultId, setResultId] = useState(null);
  const [resultData, setResultData] = useState(null);

  const fetchData = useCallback(async () => {
    if (resultId) {
      try {
        const response = await fetch(
          `https://examsystem123.vercel.app


/result/read/${resultId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setResultData(result.data); // Update state with the fetched data
        return result.data;
      } catch (error) {
        console.error("Fetch operation error:", error);
      }
    }
  }, [resultId, token]);

  useEffect(() => {
    if (resultId !== null) {
      fetchData();
    }
  }, [resultId, fetchData]);

  const fetchDataAndExport = async (id) => {
    setResultId(id);
    formate();
  };

  useEffect(() => {
    if (resultData) {
      formate();
    }
  }, [resultData]);

  const formate = async () => {
    if (resultData?.length > 0) {
      const formattedData = ResultDatas(resultData);
      downloadPdfFile(formattedData.props.children);
    } else {
      console.warn("No data to download.");
    }
  };
  console.log(sortedData);
  const downloadPdfFile = (formattedData) => {
    const element = document.createElement("div");
    element.innerHTML = formattedData;
    html2pdf().from(element).save("marksheet.pdf");
  };

  if (inputs.Tablemanuplation.isLoading) {
    return (
      <tbody>
        <tr className="border-b border-gray-400">
          <td
            colSpan="7"
            className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
          >
            Loading ...
          </td>
        </tr>
      </tbody>
    );
  }

  if (sortedData.length === 0) {
    return (
      <tbody>
        <tr className="border-b border-gray-400">
          <td
            colSpan="7"
            className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
          >
            No data found
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      {resultBy === "Section" ? (
        <tbody className="text-gray-600 text-md font-semibold w-full">
          {sortedData.map((info, ind) => (
            <tr
              key={ind}
              className={`border-b border-gray-200 hover:bg-gray-200 w-full ${
                ind % 2 !== 0 ? "bg-[#FAF5FF]" : "bg-slate-50"
              }`}
            >
              <td className="py-3 px-6 text-left flex items-center">
                {offset + ind + 1}
              </td>
              <td className="py-3 px-6 text-left">{info.username}</td>
              <td className="py-3 px-6 text-left">{info.userEmail}</td>
              <td className="py-3 px-6 text-left">
                {formatDate(info.createdAt)}
              </td>

              {info.sectionwiseResult?.map((q, qind) => (
                <td key={qind} className="py-3 px-6 text-left">
                  {" "}
                  <span
                    className={`${
                      q.status === "fail"
                        ? "bg-red-500  px-3 py-1 text-white rounded "
                        : "bg-green-500  px-3 py-1 text-white rounded"
                    }`}
                  >
                    {q.weitage} / {info.sectionwiseTotalResult[qind]?.weitage}
                  </span>
                </td>
              ))}
              <td
                className={`py-3 px-6 text-left ${
                  info.sectionWiseStatus === "fail"
                    ? "text-red-500 font-semibold text-base"
                    : "text-green-500 font-semibold text-base"
                }`}
              >
                {" "}
                {info.sectionWiseStatus.toUpperCase()}
              </td>
              <td
                className="py-3 px-6"
                onClick={() => fetchDataAndExport(info._id)}
              >
                <Download />
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="text-gray-600 text-md font-semibold w-full">
          {sortedData.map((info, ind) => (
            <tr
              key={ind}
              className={`border-b border-gray-200 hover:bg-gray-200 w-full ${
                ind % 2 !== 0 ? "bg-[#FAF5FF]" : "bg-slate-50"
              }`}
            >
              <td className="py-3 px-6 text-left flex items-center">
                {offset + ind + 1}
              </td>
              <td className="py-3 px-6 text-left">{info.username}</td>
              <td className="py-3 px-6 text-left">{info.userEmail}</td>
              <td className="py-3 px-6 text-left">
                {formatDate(info.createdAt)}
              </td>

              <td className="py-3 px-6 text-left ">
                <span
                  className={`${
                    info.status === "fail"
                      ? "bg-red-500  px-3 py-1 text-white rounded "
                      : "bg-green-500 px-3 py-1 text-white rounded"
                  }`}
                >
                  {info.result}/{info.totalResult}
                </span>
              </td>

              <td
                className={`py-3 px-6 text-left ${
                  info.status === "fail"
                    ? "text-red-500 font-semibold text-base"
                    : "text-green-500 font-semibold text-base"
                }`}
              >
                {info.status.toUpperCase()}
              </td>
              <td
                className="py-3 px-6 "
                onClick={() => fetchDataAndExport(info._id)}
              >
                <Download />
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </>
  );
}

export default Tablebody;
