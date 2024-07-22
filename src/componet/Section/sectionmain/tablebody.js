import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ReactComponent as Option } from "../../../svgfile/option.svg";
import { ReactComponent as Popbox } from "../../../svgfile/Popbox.svg";
import { ReactComponent as Upboxuparrow } from "../../../svgfile/boxuparrow.svg";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setIdstore,
  setDisplay,
  setIsloading,
  setData,
} from "../../../reduxfiles/sectionredux";

function Tablebody({ formatDate, offset, showQuestion }) {
  const url = "https://exambackendcode.vercel.app/section/getall";
  const navigate = useNavigate();
  const inputs = useSelector((state) => state.inputs2);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(null);
  const [copiedText, setCopiedText] = useState("");
  const token = localStorage.getItem("authToken");
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setCopiedText(text);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };
  const handleCopy = (text, ind) => {
    copyToClipboard(text);
    setCopiedMessage(ind);
    setTimeout(() => setCopiedMessage(null), 2000); // Hide the message after 2 seconds
  };
  const fetchData = useCallback(async () => {
    try {
      dispatch(setIsloading(true));
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
      dispatch(setIsloading(false));
    }
  }, [dispatch, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClick = useCallback(
    (id) => {
      const questionToUpdate = inputs.Tablemanuplation.data.find(
        (question) => question._id === id
      );
      navigate("/admin/Sectionform", {
        state: { itemToEdit: questionToUpdate },
      });
    },
    [inputs.Tablemanuplation.data, navigate]
  );

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await fetch(
        `https://exambackendcode.vercel.app



/section/delete/${id}`,
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
    } catch (error) {
      console.error("Fetch operation error:", error);
    }
    navigate(0);
  });

  const handleClicktd = useCallback(
    (id) => {
      dispatch(setDisplay((prevState) => !prevState));
      dispatch(setIdstore(id));
    },
    [dispatch]
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

  return inputs.Tablemanuplation.isLoading ? (
    <tbody>
      <tr className="border-b border-gray-400">
        <td
          colSpan="6"
          className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
        >
          Loading ...
        </td>
      </tr>
    </tbody>
  ) : inputs.Tablemanuplation.sortedData?.data?.length === 0 ? (
    <tbody>
      <tr className="border-b border-gray-400">
        <td
          colSpan="6"
          className="text-center font-bold p-3 whitespace-nowrap hover:bg-gray-200 border-x-2 border-gray-300"
        >
          No data found
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody className="text-gray-600 text-md font-semibold w-full">
      {inputs.Tablemanuplation.sortedData.data?.map((info, ind) => (
        <tr
          key={ind}
          className={`border-b border-gray-200 hover:bg-gray-200 w-full ${
            ind % 2 !== 0 ? "bg-[#FAF5FF]" : "bg-slate-50"
          }`}
        >
          <td className="py-3 px-6 text-left flex items-center">
            {offset + ind + 1}
          </td>
          <td className="py-3 px-6 text-left">{info.sectionname}</td>

          <td className="py-3 px-6 text-left">{formatDate(info.createdAt)}</td>
          <td
            className="py-3 px-6 text-left cursor-pointer relative"
            onClick={() => handleCopy(info.uniqsecid, ind)}
          >
            {info.uniqsecid}
            {copiedMessage === ind && (
              <span className="text-green-500 ml-2">Copied!</span>
            )}
          </td>

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
                  className="absolute shadow-lg show bg-blue-400 z-10 border rounded popover bs-popover-bottom"
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
