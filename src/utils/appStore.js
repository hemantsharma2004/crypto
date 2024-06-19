import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../utils/chatSlice"


const appStore = configureStore({
    reducer: {
      chat:chatReducer,
    },
  });

 export default appStore;