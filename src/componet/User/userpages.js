// import React, { useEffect, useRef, useState } from "react";

// import { jwtDecode } from "jwt-decode"; // Use the named export
// import Quizestart from "./Quizestart";

// function Userpage() {
//   const [isstart, setIsstart] = useState(false);
//   const [details, setDetails] = useState({});
//   const id = localStorage.getItem("paperQuizId");

//   const [showPopup, setShowPopup] = useState(false);
//   useEffect(() => {
//     const token = localStorage?.getItem("authTokenstu");
//     if (token) {
//       setDetails(jwtDecode(token)); // Use the named export
//     }
//   }, []);
//   console.log("details", details.key?._id);
//   const handleQuize = () => {
//     setIsstart(true);
//   };
//   // popupbox*****************************////////////
//   useEffect(() => {
//     const handleKeyPress = () => {
//       setShowPopup(true);
//     };
//     const handleContextMenu = (e) => {
//       e.preventDefault();
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     document.addEventListener("contextmenu", handleContextMenu);
//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//       document.removeEventListener("contextmenu", handleContextMenu);
//     };
//   }, []);

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };
import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Use the named export
import Quizestart from "./Quizestart";

function Userpage() {
  const [isstart, setIsstart] = useState(false);
  const [details, setDetails] = useState({});
  const id = localStorage.getItem("paperQuizId");

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage?.getItem("authTokenstu");
    if (token) {
      setDetails(jwtDecode(token)); // Use the named export
    }
  }, []);

  useEffect(() => {
    const requestFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    };

    requestFullscreen();
  }, []);

  const handleQuize = () => {
    setIsstart(true);
  };

  // popupbox*****************************////////////
  useEffect(() => {
    const handleKeyPress = () => {
      setShowPopup(true);
    };
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    window.addEventListener("keydown", handleKeyPress);
    document.addEventListener("contextmenu", handleContextMenu);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  return (
    <div className="App">
      {showPopup ? (
        <div className="fixed inset-0 flex items-center justify-center  bg-transparent">
          <div className=" p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Locked out</h2>
            <p className="mb-4">
              You have been temporarily locked out from the exam. This is
              because the exam window has lost focus or you have exited full
              screen mode.
            </p>
            <p className="mb-4">Please provide an explanation here.</p>
            <form action="" onSubmit={handleClosePopup}>
              <textarea
                className="w-full p-2 mb-4 border rounded"
                rows="4"
                required
                placeholder="Type your explanation..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Request unlock
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center min-h-screen font-sans p-5 bg-gray-100"
          id="fullscreen"
        >
          <div className="w-3/5 rounded-3xl p-4 shadow-lg flex flex-col justify-between items-center bg-white">
            <div className="w-full bg-gradient-to-r from-gray-700 to-black rounded-2xl p-4 shadow-lg h-full">
              <div className="flex justify-around items-center">
                <img
                  className="w-48 h-48 rounded-full shadow-lg m-4"
                  src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__480.jpg"
                  alt="Profile Image"
                />
                <div className="text-white">
                  <h3 className="text-2xl mb-5">Profile Details</h3>
                  <div className="flex">
                    <table className="w-full h-70 border-collapse">
                      <tbody>
                        <tr className="text-lg border-b">
                          <td className="font-bold py-2 px-4">FirstName:</td>
                          <td className="py-2 px-4">{details.firstname}</td>
                        </tr>
                        <tr className="text-lg border-b">
                          <td className="font-bold py-2 px-4">LastName:</td>
                          <td className="py-2 px-4">{details.lastname}</td>
                        </tr>
                        <tr className="text-lg border-b">
                          <td className="font-bold py-2 px-4">Email:</td>
                          <td className="py-2 px-4">{details.userEmail}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-7">
                <button
                  className="mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  onClick={handleQuize}
                >
                  Start Exam
                </button>
                {isstart === true && (
                  <Quizestart id={id} keyid={details.key._id} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userpage;
