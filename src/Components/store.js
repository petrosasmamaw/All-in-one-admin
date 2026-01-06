import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import sellersReducer from "./Slice/sellersSlice";
import itemsReducer from "./Slice/itemSlice";
import clientReducer from "./Slice/clientSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sellers: sellersReducer,
    items: itemsReducer,
    clients: clientReducer,
  },
});

export default store;