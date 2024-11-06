import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./global/slice";
import userReducer from "./user/slice";
import propertyReducer from "./property/slice";
import maintainerReducer from "./maintainer/slice";
import rentReducer from "./rent/slice";
import expenceReducer from "./expence/slice";
import dashboardReducer from "./dashboard/slice";

const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    userReducer: userReducer,
    propertyReducer: propertyReducer,
    maintainerReducer: maintainerReducer,
    rentReducer: rentReducer,
    expenceReducer: expenceReducer,
    dashboardReducer: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
    ];
  },
});

export { store };
