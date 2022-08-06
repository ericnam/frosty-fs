import { configureStore } from "@reduxjs/toolkit";
import filesReducer, { IFileSliceState } from "reducers/files.slice";

export interface IStore {
  files: IFileSliceState;
}
export const store = configureStore<IStore>({
  reducer: {
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
