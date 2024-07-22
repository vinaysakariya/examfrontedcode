import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openpop: false,
  dateRange: [
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ],
  Tablemanuplation: {
    isLoading: false,
    resultId: null,
    data: [],
    sortedData: [],
    totalPage: 0,
    currentPage: 1,
    totalCount: 0,
    // offset,
    display: false,
    idstore: null,
    idstores: null,

    // calendarRef,
  },
  fadeTransition: { in: false, down: false },
};
const InputSlice5 = createSlice({
  name: "inputs5",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.openpop = action.payload;
    },
    setDateRangeresultstudent: (state, action) => {
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
    setResultId: (state, action) => {
      state.Tablemanuplation.resultId = action.payload;
    },
    setIdstores: (state, action) => {
      state.Tablemanuplation.idstores = action.payload;
    },
    setTotalCount: (state, action) => {
      state.Tablemanuplation.totalCount = action.payload;
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
  resultstudent,
  setDateRangeresultstudent,
  setData,
  setIdstores,
  setResultId,
  setIsloading,
  setIdstore,
  setCurrentPage,
  setTotalCount,
  setTotalPage,
  setSortedData,
  setDisplay,
} = InputSlice5.actions;

// Export reducer
export default InputSlice5.reducer;
