import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";


export const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
