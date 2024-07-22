// import { createSlice } from "@reduxjs/toolkit";

// const InputSlice = createSlice({
//   name: "inputs",
//   initialState: {
//     userId: "",
//     sectionId: "",
//     role: "",
//   },
//   reducers: {
//     setUserid: (state, action) => {
//       state.userId = action.payload;
//     },
//     setSectionid: (state, action) => {
//       state.sectionId = action.payload;
//     },
//     setRole: (state, action) => {
//       state.role = action.payload;
//     },
//   },
// });

// export const { userId, setSectionid, setRole } = InputSlice.actions;
// export default InputSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  openpop: false,
  openuplod: false,
  dateRange: [
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ],
  Tablemanuplation: {
    isLoading: false,

    data: [],
    inputquedata: [],
    sortedData: [],
    totalPage: 0,
    currentPage: 1,

    // offset,
    display: false,
    idstore: null,
    idstores: null,

    // calendarRef,
  },
  fadeTransition: { in: false, down: false },
};

// Create a loader slice
const InputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.openpop = action.payload;
    },
    toggleuploadModal: (state, action) => {
      state.openuplod = action.payload;
    },
    setDateRange: (state, action) => {
      return {
        ...state,
        dateRange: action.payload,
      };
    },
    setIsloading: (state, action) => {
      state.Tablemanuplation.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.Tablemanuplation.data = action.payload;
    },
    setInputquedata: (state, action) => {
      state.Tablemanuplation.inputquedata = action.payload;
    },
    setSortedData: (state, action) => {
      state.Tablemanuplation.sortedData = action.payload;
    },
    setTotalPage: (state, action) => {
      state.Tablemanuplation.totalPage = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.Tablemanuplation.currentPage = action.payload;
    },
    setIdstore: (state, action) => {
      state.Tablemanuplation.idstore = action.payload;
    },
    setIdstores: (state, action) => {
      state.Tablemanuplation.idstores = action.payload;
    },
    setDisplay: (state, action) => {
      state.Tablemanuplation.display = action.payload;
    },
  },
});

// Export actions
export const {
  toggleModal,
  openModal,
  closeModal,
  setFadeTransition,
  AllModalClose,
  setDateRange,
  setData,
  setInputquedata,
  toggleuploadModal,
  setIdstores,
  setIsloading,
  setIdstore,
  setCurrentPage,
  setTotalPage,
  setSortedData,
  setDisplay,
} = InputSlice.actions;

// Export reducer
export default InputSlice.reducer;
