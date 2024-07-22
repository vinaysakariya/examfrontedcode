// import React, { useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Addquiz from "../../Quize/addquiz";
// import { Link } from "react-router-dom";
// import { setIsloading, setData } from "../../../reduxfiles/quizeSlice";

// function Showquestionbox({ showQuestion }) {
//   const id2 = localStorage.getItem("sectionId");
//   const url = `https://exambackendcode.vercel.app

/section/read`;
//   const dispatch = useDispatch();
//   const inputs = useSelector((state) => state.inputs3);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = useCallback(async () => {
//     try {
//       dispatch(setIsloading(true));
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const result = await response.json();

//       dispatch(setData(result.data));
//     } catch (error) {
//       console.error("Fetch operation error:", error);
//     } finally {
//       dispatch(setIsloading(false));
//     }
//   }, [dispatch, url]);

//   const handleDelete = useCallback(
//     async (id1) => {
//       const updatedDel = { quizeId: id1 };

//       try {
//         const response = await fetch(
//           `https://exambackendcode.vercel.app

/section/deletetquiz/${id2}`,
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
//         fetchData();
//       } catch (error) {
//         console.error("Fetch operation error:", error);
//       }
//     },
//     [id2, fetchData]
//   );

//   return (
//     <div>
//       {inputs.Tablemanuplation.data?.map(
//         (info, ind) =>
//           inputs.Tablemanuplation.idstores === info._id &&
//           inputs?.openpop === true && (
//             <div
//               key={info._id}
//               className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100 py-36"
//             >
//               <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden h-full">
//                 <div className="bg-gray-800 text-white py-3 px-4 flex justify-between items-center">
//                   <div>
//                     <Link to={"/QuizebySection"}>
//                       <button
//                         type="submit"
//                         className="btn btn-primary mr-3 flex items-center"
//                       >
//                         Add Section
//                         <Addquiz />
//                       </button>
//                     </Link>
//                   </div>
//                   <div className="text-xl font-bold text-white">
//                     {info.sectionName}
//                   </div>
//                   <div
//                     className="cursor-pointer flex items-center"
//                     onClick={() => showQuestion(info._id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 512 512"
//                       height="35px"
//                       width="35px"
//                     >
//                       <path
//                         fill="white"
//                         d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="p-6 overflow-y-scroll h-full">
//                   {info.sectioninfo?.map((index, ind) => (
//                     <div key={ind} className="mb-6">
//                       <div>
//                         <div className="flex justify-between items-center border-y-2">
//                           <div className="font-bold text-xl mb-2 mt-4">
//                             S:-
//                             <span className="break-words ml-2">
//                               {index.quizename}
//                             </span>
//                           </div>
//                           <div className="flex justify-end">
//                             <div
//                               className="cursor-pointer ml-4"
//                               onClick={() => handleDelete(index._id)}
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 448 512"
//                                 height="20px"
//                                 width="20px"
//                               >
//                                 <path
//                                   fill="#ee174c"
//                                   d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
//                                 />
//                               </svg>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )
//       )}
//     </div>
//   );
// }

// export default Showquestionbox;
