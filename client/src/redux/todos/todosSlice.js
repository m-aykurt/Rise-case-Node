import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDefaultParamsAsync } from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    searchedData: [],
    searchedByNameData: [],
    defaultParams: [],
    isLoading: false,
    error: null,

  },
  reducers: {
    getTodosFromLocal: (state, action) => {
      if (localStorage.getItem("todos") == null) {
        state.items = [];
      } else {
        state.items = JSON.parse(localStorage["todos"]);
      }
    },
    addTodoToRedux: (state, action) => {
      let newTodo = action.payload;

      if (localStorage.getItem("todos") == null) {
        localStorage.setItem("todos", "[]");
      }

      let oldTodos = JSON.parse(localStorage.getItem("todos"));
      oldTodos.push(newTodo);

      localStorage.setItem("todos", JSON.stringify(oldTodos));

      state.items = JSON.parse(localStorage["todos"]);
      state.items.sort((a, b) => a.priorty - b.priorty);
    },

    // Sort by Name

    sortByNameToAsc: (state, action) => {
      state.items.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { caseFirst: "upper" })
      );
    },
    sortByNameToDesc: (state, action) => {
      state.items.sort((b, a) =>
        a.name.localeCompare(b.name, undefined, { caseFirst: "upper" })
      );
    },

    // Sort By Priorty
    sortByPriToAsc: (state, action) => {
      state.items.sort((a, b) => a.priorty - b.priorty);
    },
    sortByPriToDesc: (state, action) => {
      state.items.sort((a, b) => b.priorty - a.priorty);
    },

    // Delete
    deleteTodo: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(filtered));
      state.items = filtered;
    },

    // update
    updateTodo: (state, action) => {
      const updated = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );

      localStorage.setItem("todos", JSON.stringify(updated));
      state.items = updated;
    },

    //Search
    searchTodoByName: (state, action) => {
      const param = action.payload;

      const searchedByName =
        param === ""
          ? state.items
          : state.items.filter((item) =>
              item.name.toLowerCase().includes(param.toLowerCase())
            );

      state.searchedByNameData = searchedByName
    },

    searchTodoByPri: (state, action) => {
      const pri = action.payload;
      const searchedByPri =
        pri === "0"
          ? state.items
          : state.items.filter((item) => item.priorty === pri);
      // localStorage.setItem("todos", JSON.stringify(searchedByPri));
      state.searchedData = searchedByPri;
    },
  },

// FOR API
  extraReducers: {
    [getDefaultParamsAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDefaultParamsAsync.fulfilled]: (state, action) => {
      state.defaultParams = action.payload;
      state.isLoading = false;
    },
    [getDefaultParamsAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

// selectors
export const selectTodos = (state) => state.todos.items;

// actions
export const {
  getTodosFromLocal,
  addTodoToRedux,
  sortByNameToAsc,
  sortByNameToDesc,
  sortByPriToAsc,
  sortByPriToDesc,
  deleteTodo,
  updateTodo,
  searchTodoByName,
  searchTodoByPri,
} = todosSlice.actions;

export default todosSlice.reducer;
