import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:1881/default";

export const getDefaultParamsAsync = createAsyncThunk(
  "todos/getDefaultParamsAsync",
  async () => {
    return await axios.get(url).then((res) => res.data);
  }
);