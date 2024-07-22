import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function Showquestionbox({ showQuestion }) {
  const inputs = useSelector((state) => state.inputs);

  // Memoize the filtered data based on inputs
  const filteredData = useMemo(() => {
    return inputs.Tablemanuplation?.data?.filter(
      (info) => inputs.Tablemanuplation.idstores === info._id
    );
  }, [inputs.Tablemanuplation.data, inputs.Tablemanuplation.idstores]);

  return (
    <div>
      {filteredData.map(
        (info) =>
          inputs.openpop === true && (
            <div
              key={info._id}
              className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-100"
            >
              <div className="bg-white w-3/4 md:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between">
                  <div className="font-bold text-xl">
                    Mark: {info.weightage}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => showQuestion(info._id)}
                  >
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
                </div>
                <div className="font-bold text-xl mb-4 mt-4 text-left">
                  <span className="break-words">{info.question}</span>
                </div>
                <div className="mb-4">
                  <label className="flex items-end mb-2">
                    <span className="font-extrabold">Option1 :-</span>
                    <span className="text-xl ml-2">{info.option1}</span>
                  </label>
                  <label className="flex items-end mb-2">
                    <span className="font-extrabold">Option2 :-</span>
                    <span className="text-xl ml-2">{info.option2}</span>
                  </label>
                  <label className="flex items-end mb-2">
                    <span className="font-extrabold">Option3 :-</span>
                    <span className="text-xl ml-2">{info.option3}</span>
                  </label>
                  <label className="flex items-end mb-2">
                    <span className="font-extrabold">Option4 :-</span>
                    <span className="text-xl ml-2">{info.option4}</span>
                  </label>
                </div>
                <div className="border-t text-left pt-4">
                  <span className="text-xl">Answer: {info.answer}</span>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default Showquestionbox;
