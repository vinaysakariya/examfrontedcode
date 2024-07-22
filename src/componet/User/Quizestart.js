import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import html2canvas from "html2canvas";
import axios from "axios";
function Quizestart({ id, keyid }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [issubmitted, setIssubmitted] = useState(false);
  const [arrrr, setArrrr] = useState([]);
  const navigate = useNavigate();
  const [currentPartPage, setCurrentPartPage] = useState(0);
  const [currentQuestionPage, setCurrentQuestionPage] = useState(0);
  const [highlightedQuestionPages, setHighlightedQuestionPages] = useState({});
  const [revisitedQuestions, setRevisitedQuestions] = useState({});

  const [answeredCount, setAnsweredCount] = useState({});
  const [unansweredCount, setUnansweredCount] = useState({});
  const token = localStorage.getItem("authTokenstu");
  const [alreadyAnswered, setAlreadyAnswered] = useState({});
  let counter = 0;

  const partsPerPage = 1; // Number of parts per page
  const questionsPerPage = 1; // Number of questions per page

  const url = `https://exam-project-backend.vercel.app/quiz/getall/${id}`;
  //*************************************************** */

  //************************************************* */
  const [timeRemaining, setTimeRemaining] = useState(); // Initial time in minutes

  //************** Take Screen shoot ***********************************/
  // useEffect(() => {
  //   const takeScreenshotAndSend = async () => {
  //     try {
  //       const canvas = await html2canvas(document.body);
  //       const imgData = canvas.toDataURL("image/png");

  //       await axios.post("https://exam-project-backend.vercel.app/file/ssupload", {
  //         screenshot: imgData,
  //       });

  //       console.log("Screenshot taken and sent successfully.");
  //     } catch (error) {
  //       console.error("Error taking screenshot and sending:", error);
  //     }
  //   };

  //   takeScreenshotAndSend();

  //   const interval = setInterval(() => {
  //     takeScreenshotAndSend();
  //   }, 60000);

  //   // Clean up interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    const totalSeconds = timeRemaining * 60;
    let currentTime = totalSeconds;

    const timer = setInterval(() => {
      currentTime -= 1;
      setTimeRemaining(currentTime / 60);

      if (currentTime <= 0) {
        clearInterval(timer);
        setTimeRemaining(0);
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const formatTime = (minutes) => {
    const totalSeconds = Math.floor(minutes * 60);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };
  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  console.log("objarrrect", data);
  useEffect(() => {
    fetchData();
  }, [url]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setData(shuffleArray(result.allData));

      setTimeRemaining(result.totalTime);
      console.log("result", result);

      let initialUnansweredCount = {};

      setArrrr((prevArrrr) => {
        console.log("Updating state with id:", id);
        // Find if the section with quizId 'id' already exists in prevArrrr
        const existingSectionIndex = prevArrrr.findIndex(
          (section) => section.quizId === id
        );

        if (existingSectionIndex !== -1) {
          const updatedArrrr = [...prevArrrr];
          updatedArrrr[existingSectionIndex] = {
            ...updatedArrrr[existingSectionIndex],
            keyid,
            questions: [
              // ...updatedArrrr[existingSectionIndex].questions,
              ...result.allData.flatMap((index, ind) =>
                index.sectionmcqs.map((i, ipd) => ({
                  sectionId: index._id,
                  sectionname: index.sectionname,
                  questionId: i._id,
                  qindex: parseInt(`${ind + 1}${ipd + 1}`),
                  weightage: i.weightage,
                  answer: "", // Initialize answer as empty string
                  isAttempted: false,
                  // asas: "if", Set to true if needed in initial state
                }))
              ),
            ],
          };

          console.log("Updated state:", updatedArrrr);
          return updatedArrrr;
        } else {
          // Section does not exist, add a new section
          const newArrrr = [
            ...prevArrrr,
            {
              quizId: id,
              keyid,
              questions: result.allData.flatMap((index, ind) =>
                index.sectionmcqs.map((i, ipd) => ({
                  sectionId: index._id,
                  sectionname: index.sectionname,
                  questionId: i._id,
                  qindex: parseInt(`${ind + 1}${ipd + 1}`),
                  weightage: i.weightage,
                  answer: "", // Initialize answer as empty string
                  isAttempted: false,
                  // aaa: "else",  Set to true if needed in initial state
                }))
              ),
            },
          ];

          console.log("New state:", newArrrr);
          return newArrrr;
        }
      });

      result.allData?.forEach((section, index) => {
        if (section.sectionmcqs && Array.isArray(section.sectionmcqs)) {
          let unansweredInSection = 0;

          section.sectionmcqs?.forEach((mcq) => {
            // Adjust the condition as per your logic to determine if a question is unanswered
            if (mcq.answer) {
              unansweredInSection++;
            }
          });

          initialUnansweredCount[`Section ${index + 1}`] = unansweredInSection;
        } else {
          initialUnansweredCount[`Section ${index + 1}`] = 0; // Handle if quizemcqs is missing or not an array
        }
      });
      setUnansweredCount(initialUnansweredCount);
    } catch (error) {
      console.error("Fetch operation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    //*************************** */

    //******************************** */
    const result = arrrr[0] || {
      quizId: `${id}`,
      questions: [],
    };

    // Check if arrrr[0] exists and has necessary data
    if (!arrrr[0] || !arrrr[0].quizId || !arrrr[0].questions.length) {
      alert("Please select an answer for all questions.");
      return; // Exit function if data is incomplete
    }

    try {
      const response = await fetch(
        "https://exam-project-backend.vercel.app/result/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(result),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      // Proceed with setting state and navigating
      setIssubmitted(true);
      localStorage.removeItem("authTokenstu");
      const intervalId = setTimeout(() => {}, 1000);
      navigate(0);
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error during submission", error);
      // Handle error state or display an error message
    }
  };
  console.log("arrrrr", arrrr);
  const handleQuestion = (e) => {
    const answer = e.target.value;
    const questionId = e.target.getAttribute("data-question-id");
    const qindex = parseInt(e.target.getAttribute("data-qindex"));
    const sectionName = `Section ${currentPartPage + 1}`;
    const sectionId = e.target.getAttribute("sectionId");
    const sectionname = e.target.getAttribute("sectionname");

    const weightage = parseInt(e.target.getAttribute("weightage"));
    // console.log(data, "dadta");
    setArrrr((prevArrrr) => {
      const existingSectionIndex = prevArrrr.findIndex(
        (section) => section.quizId === id
      );

      if (existingSectionIndex !== -1) {
        const updatedArrrr = [...prevArrrr];
        const existingSection = updatedArrrr[existingSectionIndex];
        const existingQuestionIndex = existingSection.questions.findIndex(
          (q) => q.qindex === qindex
        );

        if (existingQuestionIndex !== -1) {
          existingSection.questions[existingQuestionIndex] = {
            ...existingSection.questions[existingQuestionIndex],
            answer,
            isAttempted: true,
          };
        } else {
          existingSection.questions.push({
            questionId,
            qindex,
            sectionId,
            sectionname,
            weightage,
            answer,

            isAttempted: true,
          });
        }
        updatedArrrr[existingSectionIndex] = existingSection;
        return updatedArrrr;
      } else {
        return [
          ...prevArrrr,
          {
            quizId: id,
            keyid,
            questions: [
              {
                questionId,
                qindex,
                sectionId,
                sectionname,
                weightage,
                answer,
                keyid,
                isAttempted: true,
              },
            ],
          },
        ];
      }
    });

    if (
      !alreadyAnswered[`${currentPartPage}-${currentQuestionPage}-${qindex}`]
    ) {
      setAnsweredCount((prevAnsweredCount) => ({
        ...prevAnsweredCount,
        [sectionName]: (prevAnsweredCount[sectionName] || 0) + 1,
      }));
      console.log(answeredCount, "answeredCount");
      console.log(unansweredCount, "unansweredCount");

      setUnansweredCount((prevUnansweredCount) => ({
        ...prevUnansweredCount,
        [sectionName]: Math.max((prevUnansweredCount[sectionName] || 0) - 1, 0),
      }));

      setAlreadyAnswered((prevAlreadyAnswered) => ({
        ...prevAlreadyAnswered,
        [`${currentPartPage}-${currentQuestionPage}-${qindex}`]: true,
        [`${currentPartPage}-${currentQuestionPage}`]: true, // Mark the question as answered
      }));
    }
  };

  const handlePartPageClick = (index) => {
    setCurrentPartPage(index);
    setCurrentQuestionPage(0);
  };

  const handleQuestionPageClick = (index) => {
    setCurrentQuestionPage(index);
  };

  const handleHighlight = () => {
    const currentHighlightedPages =
      highlightedQuestionPages[currentPartPage] || [];
    const updatedHighlightedPages = currentHighlightedPages.includes(
      currentQuestionPage
    )
      ? currentHighlightedPages.filter((page) => page !== currentQuestionPage)
      : [...currentHighlightedPages, currentQuestionPage];

    setHighlightedQuestionPages((prev) => ({
      ...prev,
      [currentPartPage]: updatedHighlightedPages,
    }));

    const revisitedCount = updatedHighlightedPages.length;
    setRevisitedQuestions((prev) => ({
      ...prev,
      [`Section ${currentPartPage + 1}`]: revisitedCount,
    }));
  };

  return isLoading ? (
    <div className="flex items-center justify-center absolute left-0 h-full top-0 w-full bg-slate-300 text-5xl font-extrabold">
      Loading ...
    </div>
  ) : issubmitted ? (
    <div className="flex items-center justify-center absolute left-0 h-full top-0 w-full bg-slate-300 text-5xl font-extrabold">
      Thankyou ...
    </div>
  ) : (
    // <div
    //   className="absolute left-0 h-full bg-blue-100 top-0 w-full"
    //   id="fullscreen"
    // >
    //   <div className="flex flex-col h-screen justify-center items-center w-full p-8 ">
    //     <div className=" bg-red-50 p-8 w-full shadow-slate-600 shadow-xl rounded-lg">
    //       <div className="bg-white shadow-lg shadow-slate-50 w-full px-6 py-2 flex flex-col sm:flex-row justify-between rounded-lg items-center mb-3">
    //         <div className="mb-3 sm:mb-0">
    //           <div className="flex items-center mb-3">
    //             <h1 className="font-bold text-xl">Section :- </h1>
    //             <div className="flex items-center mx-2">
    //               {Array.from({
    //                 length: Math.ceil(data.length / partsPerPage),
    //               }).map((_, index) => (
    //                 <button
    //                   key={index}
    //                   className={`mx-1 px-3 py-1 rounded-md font-bold ${
    //                     alreadyAnswered[`part-${index}`]
    //                       ? "bg-green-500 text-white"
    //                       : currentPartPage === index
    //                       ? "bg-blue-500 text-white"
    //                       : "bg-gray-200 text-black"
    //                   }`}
    //                   onClick={() => handlePartPageClick(index)}
    //                 >
    //                   {index + 1}
    //                 </button>
    //               ))}
    //             </div>
    //           </div>
    //           <div className="flex flex-col sm:flex-row sm:justify-start">
    //             <div className="mb-2 sm:mb-0 sm:mr-4">
    //               <h1 className="font-bold text-xl sm:text-2xl">Question:-</h1>
    //             </div>
    //             <div className="flex flex-wrap justify-center sm:justify-start">
    //               {Array.from({
    //                 length: Math.ceil(
    //                   (data[currentPartPage]?.sectionmcqs?.length || 0) /
    //                     questionsPerPage
    //                 ),
    //               }).map((_, index) => {
    //                 const buttonClass = `mx-1 my-1 px-3 py-1 rounded-md font-bold transition-colors duration-300 ${
    //                   highlightedQuestionPages[currentPartPage]?.includes(index)
    //                     ? "bg-yellow-500 text-white"
    //                     : alreadyAnswered[`${currentPartPage}-${index}`]
    //                     ? "bg-green-500 text-white"
    //                     : currentQuestionPage === index
    //                     ? "bg-blue-500 text-white"
    //                     : "bg-gray-200 text-black hover:bg-gray-300"
    //                 }`;

    //                 return (
    //                   <button
    //                     key={index}
    //                     className={buttonClass}
    //                     onClick={() => handleQuestionPageClick(index)}
    //                   >
    //                     {index + 1}
    //                   </button>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         </div>
    //         <div className="p-2 ">
    //           <table className="border-collapse border border-gray-200 w-full">
    //             <thead>
    //               <tr className="bg-gray-100 border border-gray-200">
    //                 <th className="border border-white px-5 py-2">Section</th>
    //                 <th className="border border-white bg-green-600 font-bold text-white px-4 py-2">
    //                   Answered
    //                 </th>
    //                 <th className="border border-white bg-gray-300 px-4 py-2">
    //                   Unanswered
    //                 </th>
    //                 <th className="border border-white bg-yellow-400 font-bold text-white px-4 py-2">
    //                   Highlight
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {data.map((_, index) => (
    //                 <tr key={index} className="border border-gray-200">
    //                   <td className="border border-white bg-slate-100 px-4 py-2">
    //                     Section {index + 1}
    //                   </td>
    //                   <td className="border border-white bg-green-600 font-bold text-white px-4 py-2 text-center">
    //                     {answeredCount[`Section ${index + 1}`] || 0}
    //                   </td>
    //                   <td className="border border-white bg-gray-300 px-4 py-2 text-center">
    //                     {unansweredCount[`Section ${index + 1}`] !== undefined
    //                       ? unansweredCount[`Section ${index + 1}`]
    //                       : 0}
    //                   </td>
    //                   <td className="border border-white bg-yellow-400 font-bold text-white text-center px-4 py-2">
    //                     {revisitedQuestions[`Section ${index + 1}`] || 0}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //       ;
    //       {data
    //         ?.slice(
    //           currentPartPage * partsPerPage,
    //           (currentPartPage + 1) * partsPerPage
    //         )
    //         ?.map((info, partIndex) => (
    //           <div
    //             key={partIndex}
    //             className="bg-white shadow-lg shadow-slate-50 w-full my-2 px-6 py-2 rounded-lg"
    //           >
    //             <div className="border-red-600 p-2">
    //               <div className="flex items-center justify-between mb-4">
    //                 <h1 className="text-3xl font-bold">{info?.sectionname}</h1>

    //                 <div className="timer text-2xl font-extrabold ">
    //                   Timer : -{" "}
    //                   <span className="text-red-600">
    //                     {formatTime(timeRemaining)}
    //                   </span>{" "}
    //                   Minutes
    //                 </div>
    //                 <div>
    //                   <h1 className="text-3xl font-bold">
    //                     Part {partIndex + 1 + currentPartPage * partsPerPage}
    //                   </h1>
    //                 </div>
    //               </div>

    //               <div>
    //                 {
    //                   // shuffleArray(info.quizemcqs) &&
    //                   info?.sectionmcqs
    //                     ?.slice(
    //                       currentQuestionPage * questionsPerPage,
    //                       (currentQuestionPage + 1) * questionsPerPage
    //                     )
    //                     ?.map((ele, questionIndex) => {
    //                       counter = `${currentPartPage + 1}${
    //                         currentQuestionPage + 1
    //                       }`;

    //                       const qcount =
    //                         questionIndex +
    //                         1 +
    //                         currentQuestionPage * questionsPerPage;

    //                       const existingAnswer = arrrr
    //                         ?.find((section) => section.quizId === id)
    //                         ?.questions?.find(
    //                           (q) => q.qindex === parseInt(counter)
    //                         )?.answer;

    //                       const xyz = `${
    //                         partIndex + 1 + currentPartPage * partsPerPage
    //                       }${qcount}`;

    //                       console.log(existingAnswer, "existingAnswer");

    //                       return (
    //                         <div key={questionIndex} className="mb-4">
    //                           <div className="flex justify-between">
    //                             <h1 className="text-xl font-bold">{`Question ${qcount}`}</h1>
    //                             <h1 className="text-xl font-bold">
    //                               Marks :- {ele.weightage}
    //                             </h1>
    //                           </div>

    //                           <div className="border-2 py-3 font-bold text-xl pl-2 mb-3">
    //                             {ele.question}
    //                           </div>
    //                           <div>
    //                             {[
    //                               ele.option1,
    //                               ele.option2,
    //                               ele.option3,
    //                               ele.option4,
    //                             ].map((option, index) => (
    //                               <div key={index} className="border-2 p-2 ">
    //                                 <input
    //                                   type="radio"
    //                                   sectionId={ele._id}
    //                                   sectionname={ele.sectionname}
    //                                   weightage={ele.weightage}
    //                                   name={`option-${partIndex}-${questionIndex}`}
    //                                   value={`option${index + 1}`}
    //                                   data-question-id={ele._id}
    //                                   data-qindex={xyz}
    //                                   checked={
    //                                     existingAnswer === `option${index + 1}`
    //                                   }
    //                                   onChange={handleQuestion}
    //                                 />
    //                                 <label
    //                                   className="ml-2 text-xl"
    //                                   htmlFor={`option-${partIndex}-${questionIndex}-${
    //                                     index + 1
    //                                   }`}
    //                                 >
    //                                   {option}
    //                                 </label>
    //                               </div>
    //                             ))}
    //                           </div>
    //                         </div>
    //                       );
    //                     })
    //                 }
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       <div className="bg-white shadow-lg shadow-slate-50 w-full px-6 py-2 flex justify-between rounded-lg mt-3 ">
    //         <div className="flex">
    //           <div>
    //             <button
    //               className={`btn btn-primary font-bold ${
    //                 currentQuestionPage === 0
    //                   ? "opacity-50 cursor-not-allowed"
    //                   : ""
    //               }`}
    //               onClick={() =>
    //                 setCurrentQuestionPage((prev) => Math.max(prev - 1, 0))
    //               }
    //               disabled={currentQuestionPage === 0}
    //             >
    //               Prev
    //             </button>
    //           </div>
    //           <div className="ml-6">
    //             <button
    //               className={`btn btn-warning text-white font-bold ${
    //                 highlightedQuestionPages[currentPartPage]?.includes(
    //                   currentQuestionPage
    //                 )
    //                   ? "highlighted"
    //                   : ""
    //               }`}
    //               onClick={handleHighlight}
    //             >
    //               {highlightedQuestionPages[currentPartPage]?.includes(
    //                 currentQuestionPage
    //               )
    //                 ? "Unhighlight"
    //                 : "Highlight"}
    //             </button>
    //           </div>
    //           <div className="ml-6">
    //             <button
    //               className={`btn btn-primary font-bold${
    //                 currentQuestionPage ===
    //                 Math.ceil(
    //                   (data[currentPartPage]?.sectionmcqs?.length || 0) /
    //                     questionsPerPage
    //                 ) -
    //                   1
    //                   ? "opacity-50 cursor-not-allowed"
    //                   : ""
    //               }`}
    //               onClick={() =>
    //                 setCurrentQuestionPage((prev) =>
    //                   Math.min(
    //                     prev + 1,
    //                     Math.ceil(
    //                       (data[currentPartPage]?.sectionmcqs?.length || 0) /
    //                         questionsPerPage
    //                     ) - 1
    //                   )
    //                 )
    //               }
    //               disabled={
    //                 currentQuestionPage ===
    //                 Math.ceil(
    //                   (data[currentPartPage]?.sectionmcqs?.length || 0) /
    //                     questionsPerPage
    //                 ) -
    //                   1
    //               }
    //             >
    //               Next
    //             </button>
    //           </div>
    //         </div>
    //         <div className="">
    //           <button
    //             className="btn btn-danger font-bold"
    //             onClick={(e) => handleSubmit(e)}
    //           >
    //             Submit Quiz
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="absolute left-0 h-full bg-blue-100 top-0 w-full"
      id="fullscreen"
    >
      <div className="flex flex-col h-screen justify-center items-center w-full p-8 ">
        <div className="bg-red-50 p-8 w-full shadow-slate-600 shadow-xl rounded-lg">
          <div className="bg-white shadow-lg shadow-slate-50 w-full px-6 py-2 flex flex-col sm:flex-row justify-between rounded-lg items-center mb-3">
            <div className="mb-3 sm:mb-0">
              <div className="flex items-center mb-3">
                <h1 className="font-bold text-xl sm:text-2xl">Section :- </h1>
                <div className="flex items-center mx-2">
                  {Array.from({
                    length: Math.ceil(data.length / partsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      className={`mx-1 px-3 py-1 rounded-md font-bold ${
                        alreadyAnswered[`part-${index}`]
                          ? "bg-green-500 text-white"
                          : currentPartPage === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      onClick={() => handlePartPageClick(index)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-start">
                <div className="mb-2 sm:mb-0 sm:mr-4">
                  <h1 className="font-bold text-xl sm:text-2xl">Question:-</h1>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start">
                  {Array.from({
                    length: Math.ceil(
                      (data[currentPartPage]?.sectionmcqs?.length || 0) /
                        questionsPerPage
                    ),
                  }).map((_, index) => {
                    const buttonClass = `mx-1 my-1 px-3 py-1 rounded-md font-bold transition-colors duration-300 ${
                      highlightedQuestionPages[currentPartPage]?.includes(index)
                        ? "bg-yellow-500 text-white"
                        : alreadyAnswered[`${currentPartPage}-${index}`]
                        ? "bg-green-500 text-white"
                        : currentQuestionPage === index
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black hover:bg-gray-300"
                    }`;

                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        onClick={() => handleQuestionPageClick(index)}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-2 ">
              <table className="border-collapse border border-gray-200 w-full">
                <thead>
                  <tr className="bg-gray-100 border border-gray-200">
                    <th className="border border-white px-5 py-2">Section</th>
                    <th className="border border-white bg-green-600 font-bold text-white px-4 py-2">
                      Answered
                    </th>
                    <th className="border border-white bg-gray-300 px-4 py-2">
                      Unanswered
                    </th>
                    <th className="border border-white bg-yellow-400 font-bold text-white px-4 py-2">
                      Highlight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((_, index) => (
                    <tr key={index} className="border border-gray-200">
                      <td className="border border-white bg-slate-100 px-4 py-2">
                        Section {index + 1}
                      </td>
                      <td className="border border-white bg-green-600 font-bold text-white px-4 py-2 text-center">
                        {answeredCount[`Section ${index + 1}`] || 0}
                      </td>
                      <td className="border border-white bg-gray-300 px-4 py-2 text-center">
                        {unansweredCount[`Section ${index + 1}`] !== undefined
                          ? unansweredCount[`Section ${index + 1}`]
                          : 0}
                      </td>
                      <td className="border border-white bg-yellow-400 font-bold text-white text-center px-4 py-2">
                        {revisitedQuestions[`Section ${index + 1}`] || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {data
            ?.slice(
              currentPartPage * partsPerPage,
              (currentPartPage + 1) * partsPerPage
            )
            ?.map((info, partIndex) => (
              <div
                key={partIndex}
                className="bg-white shadow-lg shadow-slate-50 w-full my-2 px-6 py-2 rounded-lg"
              >
                <div className="border-red-600 p-2">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{info?.sectionname}</h1>

                    <div className="timer text-2xl font-extrabold ">
                      Timer : -{" "}
                      <span className="text-red-600">
                        {formatTime(timeRemaining)}
                      </span>{" "}
                      Minutes
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">
                        Part {partIndex + 1 + currentPartPage * partsPerPage}
                      </h1>
                    </div>
                  </div>

                  <div>
                    {info?.sectionmcqs
                      ?.slice(
                        currentQuestionPage * questionsPerPage,
                        (currentQuestionPage + 1) * questionsPerPage
                      )
                      ?.map((ele, questionIndex) => {
                        const counter = `${currentPartPage + 1}${
                          currentQuestionPage + 1
                        }`;

                        const qcount =
                          questionIndex +
                          1 +
                          currentQuestionPage * questionsPerPage;

                        const existingAnswer = arrrr
                          ?.find((section) => section.quizId === id)
                          ?.questions?.find(
                            (q) => q.qindex === parseInt(counter)
                          )?.answer;

                        const xyz = `${
                          partIndex + 1 + currentPartPage * partsPerPage
                        }${qcount}`;

                        return (
                          <div key={questionIndex} className="mb-4">
                            <div className="flex justify-between">
                              <h1 className="text-xl font-bold">{`Question ${qcount}`}</h1>
                              <h1 className="text-xl font-bold">
                                Marks :- {ele.weightage}
                              </h1>
                            </div>

                            <div className="border-2 py-3 font-bold text-xl pl-2 mb-3 text-left">
                              {ele.question}
                            </div>
                            <div>
                              {[
                                ele.option1,
                                ele.option2,
                                ele.option3,
                                ele.option4,
                              ].map((option, index) => (
                                <div
                                  key={index}
                                  className="border-2 p-2 text-left"
                                >
                                  <input
                                    type="radio"
                                    sectionId={ele._id}
                                    sectionname={ele.sectionname}
                                    weightage={ele.weightage}
                                    name={`option-${partIndex}-${questionIndex}`}
                                    value={`option${index + 1}`}
                                    data-question-id={ele._id}
                                    data-qindex={xyz}
                                    checked={
                                      existingAnswer === `option${index + 1}`
                                    }
                                    onChange={handleQuestion}
                                  />
                                  <label
                                    className="ml-2 text-xl t"
                                    htmlFor={`option-${partIndex}-${questionIndex}-${
                                      index + 1
                                    }`}
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ))}
          <div className="bg-white shadow-lg shadow-slate-50 w-full px-6 py-2 flex justify-between rounded-lg mt-3 ">
            <div className="flex">
              <div>
                <button
                  className={`btn btn-primary font-bold ${
                    currentQuestionPage === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentQuestionPage((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentQuestionPage === 0}
                >
                  Prev
                </button>
              </div>
              <div className="ml-6">
                <button
                  className={`btn btn-warning text-white font-bold ${
                    highlightedQuestionPages[currentPartPage]?.includes(
                      currentQuestionPage
                    )
                      ? "highlighted"
                      : ""
                  }`}
                  onClick={handleHighlight}
                >
                  {highlightedQuestionPages[currentPartPage]?.includes(
                    currentQuestionPage
                  )
                    ? "Unhighlight"
                    : "Highlight"}
                </button>
              </div>
              <div className="ml-6">
                <button
                  className={`btn btn-primary font-bold${
                    currentQuestionPage ===
                    Math.ceil(
                      (data[currentPartPage]?.sectionmcqs?.length || 0) /
                        questionsPerPage
                    ) -
                      1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentQuestionPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(
                          (data[currentPartPage]?.sectionmcqs?.length || 0) /
                            questionsPerPage
                        ) - 1
                      )
                    )
                  }
                  disabled={
                    currentQuestionPage ===
                    Math.ceil(
                      (data[currentPartPage]?.sectionmcqs?.length || 0) /
                        questionsPerPage
                    ) -
                      1
                  }
                >
                  Next
                </button>
              </div>
            </div>
            <div className="">
              <button
                className="btn btn-danger font-bold"
                onClick={(e) => handleSubmit(e)}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quizestart;
