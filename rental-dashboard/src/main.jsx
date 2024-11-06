import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { store } from "./store/store.js";
import "@fontsource/poppins";

setupListeners(store.dispatch);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
