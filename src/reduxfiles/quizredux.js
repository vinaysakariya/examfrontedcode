import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openpop: false,
  keyopenpop: false,
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
    keydata: [],
    sortedData: [],
    totalPage: 0,
    currentPage: 1,
    totalCount: 0,
    idkeystores: null,
    // offset,
    display: false,
    idstore: null,
    idstores: null,

    // calendarRef,
  },
  fadeTransition: { in: false, down: false },
};
const InputSlice2 = createSlice({
  name: "inputs3",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.openpop = action.payload;
    },

    toggleModalkey: (state, action) => {
      state.keyopenpop = action.payload;
    },
    setDateRangequize: (state, action) => {
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
    setKeyData: (state, action) => {
      state.Tablemanuplation.keydata = action.payload;
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
    setIdkeystores: (state, action) => {
      state.Tablemanuplation.idkeystores = action.payload;
    },
    setDisplay: (state, action) => {
      state.Tablemanuplation.display = action.payload;
    },
    setTotalCount: (state, action) => {
      state.Tablemanuplation.totalCount = action.payload;
    },
  },
});

// Export actions
export const {
  toggleModal,
  toggleModalkey,
  setIdkeystores,
  openModal,
  setTotalCount,
  closeModal,
  setFadeTransition,
  AllModalClose,
  setDateRangequize,
  setData,
  setKeyData,
  setIdstores,
  setIsloading,
  setIdstore,
  setCurrentPage,
  setTotalPage,
  setSortedData,
  setDisplay,
} = InputSlice2.actions;

// Export reducer
export default InputSlice2.reducer;
