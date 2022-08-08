import { configureStore } from "@reduxjs/toolkit";
import filesReducer, { IFileSliceState } from "reducers/files.slice";
// import fileSelectionReducer, {
//   IFileSelectionSliceState,
// } from "reducers/fileSelection.slice";

export interface IStore {
  files: IFileSliceState;
  // fileSelection: IFileSelectionSliceState;
}
export const store = configureStore<IStore>({
  reducer: {
    files: filesReducer,
    // fileSelection: fileSelectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
