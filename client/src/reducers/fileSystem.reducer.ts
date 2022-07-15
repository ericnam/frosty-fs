// import { FileSystemModel } from "@data/filesystem/model";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState: {
    // root node points to children
    // we iterate children
    directory: {},
    currentDirectory: "",
  },
  reducers: {
    addDirectory: (state: any, action) => {
      state.directory[action.payload["directoryId"]] =
        action.payload["subDirectories"];
    },
    setCurrentDirectory: (state: any, action) => {
      if (action.payload === null) {
        action.payload = "root";
      }

      state.currentDirectory = action.payload;
    },
  },
});

export const { addDirectory, setCurrentDirectory } = fileSystemSlice.actions;

export const getDirectory = (state: RootState) => state.fileSystem.directory;
export const getCurrentDirectory = (state: RootState) =>
  state.fileSystem.currentDirectory;

export default fileSystemSlice.reducer;
