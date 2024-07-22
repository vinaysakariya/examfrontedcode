// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../fixdata/sidebar";
// import Navbar from "../fixdata/navbar";

// function QuizHome({ setIsLoggedIn }) {
//   const id = localStorage.getItem("QuizeId");

//   const [data, setData] = useState([]);
//   const navigator = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `https://exambackendcode.vercel.app

/quiz/read/${id}`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Fetch operation error:", error);
//     }
//   }, [id]);

//   const handleDelete = useCallback(
//     async (id1) => {
//       const updatedDel = { quizeId: id1 };

//       try {
//         const response = await fetch(
//           `https://exambackendcode.vercel.app

/quiz/deletetquiz/${id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedDel),
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         await response.json();

//         navigator(0);
//       } catch (error) {
//         console.error("Fetch operation error:", error);
//       }
//     },
//     [id, navigator]
//   );

//   const handleQuize = useCallback((id) => {
//     localStorage.setItem("QuizeId", id);
//   }, []);

//   const sectionIds = useMemo(
//     () => data.data?.sectioninfo?.map((info) => info._id),
//     [data.data?.sectioninfo]
//   );

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="w-full">
//         <Navbar setIsLoggedIn={setIsLoggedIn} />
//         <div className="flex flex-col justify-between mt-5">
//           <div></div>
//           <div className="flex items-center flex-col p-2 bg-blue-300">
//             <div>Add Section In Quiz</div>
//             <Link to={`/QuizHome/Quizmain/quizelist`}>
//               <button className="bg-red-300 w-fit mt-1" type="submit">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 448 512"
//                   height="50px"
//                   width="50px"
//                 >
//                   <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
//                 </svg>
//               </button>
//             </Link>
//           </div>

//           <div className="bg-slate-300 m-5 rounded-md">
//             <h1 className="font-bold text-2xl flex justify-center border-b-2 w-full p-2">
//               Added Questions
//             </h1>
//             {data.data?.sectioninfo?.map((info, ind) => (
//               <div key={info._id} className="border-red-600 m-10">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h1 className="text-3xl mb-2 font-bold">Quiz {ind + 1}</h1>
//                   </div>
//                   <div className="flex">
//                     <div
//                       className="cursor-pointer ml-4"
//                       onClick={() => handleDelete(info._id)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 448 512"
//                         height="20px"
//                         width="20px"
//                       >
//                         <path
//                           fill="#ee174c"
//                           d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//                 <Link to={`/Quizmain/question-list`}>
//                   <div
//                     className="bottom-1 border-2 py-3 font-bold text-xl pl-2"
//                     onClick={() => handleQuize(info._id)}
//                   >
//                     {info.quizename}sssssssss
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizHome;
