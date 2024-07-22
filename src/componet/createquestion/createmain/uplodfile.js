import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleuploadModal } from "../../../reduxfiles/inputredux";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

function Uplodfile() {
  const dispatch = useDispatch();
  const inputs = useSelector((state) => state.inputs);
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [data, setData] = useState(null);
  const token = localStorage.getItem("authToken");
  const Closebox = useCallback(() => {
    dispatch(toggleuploadModal(!inputs.openuplod));
    setTypeError();
  }, [dispatch, inputs.openuplod]);

  const handleFile = async (e) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        const formData = new FormData();
        console.log("File selected:", selectedFile);
        formData.append("file", selectedFile);
        setFile(selectedFile.name);

        try {
          const response = await axios.post(
            "examfrontedcode.vercel.app/file/questionupload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",

                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data.data);
          navigate("/admin/createmain");
        } catch (error) {
          setTypeError("Error uploading file.");
          console.error("Error uploading file:", error);
        }
      } else {
        setTypeError("Please select only Excel file types.");
      }
    } else {
      console.log("Please select your file.");
    }
  };
  const handleFileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `examfrontedcode.vercel.app/file/questioread/${file}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTypeError("File uploaded successfully!");
    } catch (error) {
      setTypeError("Invalid data format in Excel file");
      console.error("Error uploading file:", error);
    }
    setTypeError();
  };

  return (
    inputs.openuplod === true && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100">
        <div className="bg-white w-3/4 md:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
          <div className="cursor-pointer flex justify-end" onClick={Closebox}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="35px"
              width="35px"
            >
              <path
                fill="#64748B"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
              />
            </svg>
          </div>
          <form
            className="form-group custom-form mt-3"
            onSubmit={handleFileSubmit}
          >
            <input
              type="file"
              className="form-control"
              name="file"
              required
              onChange={handleFile}
            />
            <button type="submit" className="btn btn-success btn-md mt-4">
              UPLOAD
            </button>

            {typeError && (
              <div className="alert alert-danger mt-4" role="alert">
                {typeError}
              </div>
            )}
          </form>
        </div>
      </div>
    )
  );
}

export default Uplodfile;
// const handleFile = (e) => {
//   let fileTypes = [
//     "application/vnd.ms-excel",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     "text/csv",
//   ];
//   let selectedFile = e.target.files[0];
//   if (selectedFile) {
//     if (selectedFile && fileTypes.includes(selectedFile.type)) {
//       setTypeError(null);
//       let reader = new FileReader();
//       reader.readAsArrayBuffer(selectedFile);
//       reader.onload = (e) => {
//         setExcelFile(e.target.result);
//       };
//     } else {
//       setTypeError("Please select only excel file types");
//       setExcelFile(null);
//     }
//   } else {
//     console.log("Please select your file");
//   }
// };

// const handleFileSubmit = async (e) => {
//   e.preventDefault();
//   if (excelFile !== null) {
//     const workbook = XLSX.read(excelFile, { type: "buffer" });
//     const worksheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[worksheetName];
//     const data = XLSX.utils.sheet_to_json(worksheet);

//     // Validate and process data
//     const validatedData = data
//       .map((item) => {
//         if (
//           item.question &&
//           item.option1 &&
//           item.option2 &&
//           item.option3 &&
//           item.option4 &&
//           (item.answer === "option1" ||
//             item.answer === "option2" ||
//             item.answer === "option3" ||
//             item.answer === "option4")
//         ) {
//           return item;
//         } else {
//           setTypeError("Invalid data format in Excel file");
//           return null;
//         }
//       })
//       .filter((item) => item !== null);

//     if (validatedData.length > 0) {
//       setExcelData(validatedData);
//       const createApi = "examfrontedcode.vercel.app/questions/create";

//       try {
//         const responses = await Promise.all(
//           validatedData.map((ele) =>
//             fetch(createApi, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(ele),
//             })
//           )
//         );

//         const allResponsesOk = responses.every((response) => response.ok);

//         if (allResponsesOk) {
//           console.log("All questions added successfully");
//           navigate("/createmain");
//         } else {
//           console.error("One or more responses were not ok");
//         }
//       } catch (error) {
//         console.error("Fetch operation error:", error);
//       }
//     } else {
//       setExcelData(null);
//     }
//   }
//   navigate(0);
// };
