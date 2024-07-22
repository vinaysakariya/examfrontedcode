import { configureStore } from "@reduxjs/toolkit";
// import inputReducer from './slice'; // Adjust path if necessary
import inputReducer from "./reduxfiles/inputredux";
import inputReducer2 from "./reduxfiles/sectionredux";
import inputReducer3 from "./reduxfiles/quizredux";
import inputReducer4 from "./reduxfiles/result";
import inputReducer5 from "./reduxfiles/resultstudentSlice";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
    inputs2: inputReducer2,
    inputs3: inputReducer3,
    inputs4: inputReducer4,
    inputs5: inputReducer5,
  },
});

export default store;
