import { IFileModel } from "@data/files/model";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import filesReducers from "./files.reducer";

export interface IReduxFiles {
  [key: string]: IFileModel;
}
export interface IReduxSubDirectories {
  [key: string]: IFileModel[];
}
export const filesSlice = createSlice({
  name: "files",
  initialState: {
    filePath: [] as string[],
    currentFileId: "" as string,
    files: {} as IReduxFiles,
    subDirectories: {} as IReduxSubDirectories,
  },
  reducers: filesReducers,
});

export const { setSubDirectory, setCurrentFile, setFiles } = filesSlice.actions;

export const getFiles = (state: RootState) => state.files.files;
export const getSubDirectories = (state: RootState) =>
  state.files.subDirectories;
export const getCurrentDirectoryId = (state: RootState) =>
  state.files.currentFileId;
export const getCurrentFile = (state: RootState) =>
  state.files.files[state.files.currentFileId];
export const getFilePath = (state: RootState) =>
  state.files.filePath.map((fp) => {
    return { fileId: fp, title: state.files.files[fp].title };
  });

export default filesSlice.reducer;
