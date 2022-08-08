// import { createSlice } from "@reduxjs/toolkit";
// // import { RootState } from "store";
// import fileSelectionReducer from "./fileSelection.reducer";

// export interface IFileSelectionSliceState {
//   activeDirectoryFilePath: string[];
//   activeDirecotryFileId: string;
//   view: string;
// }

// export const fileSelectionSlice = createSlice({
//   name: "files",
//   initialState: {
//     activeDirecotryFileId: "",
//     activeDirectoryFilePath: [],
//     view: "",
//   } as IFileSelectionSliceState,
//   reducers: fileSelectionReducer,
// });

// export const { setActiveDirectoryFileId } = fileSelectionSlice.actions;

// // export const getFiles = (state: RootState) => state.files.files;
// // export const getSubDirectories = (state: RootState) =>
// //   state.files.subDirectories;
// // export const getCurrentDirectoryId = (state: RootState) =>
// //   state.files.currentFileId;
// // export const getCurrentFile = (state: RootState) =>
// //   state.files.files[state.files.currentFileId];
// // export const getCurrentView = (state: RootState) => state.files.currentView;
// // export const getFilePath = (state: RootState) =>
// //   state.files.filePath.map((fp) => {
// //     return { fileId: fp, title: state.files.files[fp].title };
// //   });

// export default fileSelectionSlice.reducer;
