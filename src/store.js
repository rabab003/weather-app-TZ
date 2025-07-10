import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from "./weatherApiSlice";

// todo:important need slices

export default configureStore({
  reducer: {
    weather: weatherApiSlice,
  },
});
