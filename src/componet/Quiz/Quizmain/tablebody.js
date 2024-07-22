import React, { useEffect, useCallback, useRef } from "react";
import { ReactComponent as Option } from "../../../svgfile/option.svg";
import { ReactComponent as Popbox } from "../../../svgfile/Popbox.svg";
import { ReactComponent as Upboxuparrow } from "../../../svgfile/boxuparrow.svg";
import { ReactComponent as Key } from "../../../svgfile/key.svg";

import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Download } from "../../../svgfile/download.svg";
import {
  setIdstore,
  setDisplay,
  setData,
  setCurrentPage,
  toggleModalkey,
  setIdkeystores,
} from "../../../reduxfiles/quizredux";

function Tablebody({ formatDate, offset, showQuestion }) {
  const url = "https://exam-project-backend.vercel.app/quiz/read";
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs3);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  console.log(inputs?.Tablemanuplation?.sortedData?.data, "www");
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      dispatch(setData(result.data));
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
    }
  }, [dispatch, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchDataAndExport = async (id) => {
    try {
      const response = await fetch(
        `https://exam-project-backend.vercel.app/quiz/getall/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data, "data");

      const formattedData = formatData(data.allData);

      downloadPdfFile(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatData = (data) => {
    let formattedText =
      "                                                   EXAM PAPER\n\n";

    data?.forEach((info, sectionIndex) => {
      formattedText += `Section ${sectionIndex + 1}: ${info.sectionname}\n`;
      formattedText += "---------------------------------------------\n\n";

      info.sectionmcqs?.forEach((question, questionIndex) => {
        formattedText += `Q${questionIndex + 1}: ${question.question}\n`;
        formattedText += `  A. ${question.option1}\n`;
        formattedText += `  B. ${question.option2}\n`;
        formattedText += `  C. ${question.option3}\n`;
        formattedText += `  D. ${question.option4}\n`;
        formattedText += "\n";
      });

      formattedText += "\n";
    });

    return formattedText;
  };

  const downloadPdfFile = (formattedData) => {
    const doc = new jsPDF();
    const lines = formattedData.split("\n");
    let y = 10;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.height;

    lines.forEach((line, index) => {
      if (y + lineHeight > pageHeight - 10) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 10, y);
      y += lineHeight;
    });

    doc.save("exam-paper.pdf");
  };

  //********************************************** */
  const handleShowkey = useCallback(
    async (id) => {
      dispatch(setIdkeystores(id));
      localStorage.setItem("keyQuizeId", id);
      dispatch(toggleModalkey(!inputs.keyopenpop));
    },
    [dispatch, inputs.keyopenpop]
  );
  const handleEditClick = useCallback(
    (id) => {
      const sectionToUpdate = inputs.Tablemanuplation.data.find(
        (section) => section._id === id
      );
      navigate("/admin/AddQuiz", {
        state: { itemToEdit: sectionToUpdate },
      });
    },
    [inputs.Tablemanuplation.data, navigate]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://exam-project-backend.vercel.app/quiz/delete/${id}`,
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
        dispatch(setCurrentPage(1));
      } catch (error) {
        console.error("Fetch operation error:", error);
      }
      navigate(0);
    },
    [fetchData, dispatch]
  );

  const handleClicktd = useCallback(
    (id) => {
      dispatch(setDisplay(!inputs.Tablemanuplation.display));
      dispatch(setIdstore(id));
    },
    [dispatch, inputs.Tablemanuplation.display]
  );

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

  return inputs?.Tablemanuplation?.isLoading ? (
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
  ) : inputs?.Tablemanuplation?.sortedData?.data?.length === 0 ? (
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
  ) : (
    <tbody className="text-gray-600 text-md font-semibold w-full">
      {inputs?.Tablemanuplation?.sortedData?.data?.map((info, ind) => (
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
            <div className=" " onClick={() => handleShowkey(info._id)}>
              <Key />
            </div>
          </td>

          <td className="py-3 px-6 text-left">{formatDate(info.createdAt)}</td>

          <td className="py-3 px-6 text-left">
            <button
              className="text-blue-600 hover:text-blue-900"
              onClick={() => showQuestion(info._id)}
            >
              <div className="flex justify-center">
                <Popbox />
              </div>
            </button>
          </td>

          <td className="py-3 px-6 text-left">
            <button
              className="text-blue-600 hover:text-blue-900"
              onClick={() => fetchDataAndExport(info._id)}
            >
              <div className="flex justify-center">
                <Download />
              </div>
            </button>
          </td>
          <td className="relative">
            <button
              className="ml-4 text-blue-600 hover:text-blue-900"
              onClick={() => handleClicktd(info._id)}
            >
              <div className="flex justify-center">
                <Option />
              </div>
            </button>

            {inputs.Tablemanuplation.display &&
              inputs.Tablemanuplation.idstore === info._id && (
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
                        onClick={() => handleEditClick(info._id)}
                      >
                        Edit
                      </li>
                      <li
                        className="cursor-pointer hover:bg-blue-300 p-1 rounded text-black font-bold"
                        onClick={() => handleDelete(info._id)}
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
