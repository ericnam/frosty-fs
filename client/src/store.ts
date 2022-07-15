import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "reducers/fileSystem.reducer";

export const store = configureStore({
  reducer: {
    fileSystem: fileSystemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
