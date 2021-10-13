/* global process */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./config/store";
import App from "./App";

import "./styles/main.scss";

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <>
          <App />
          {process.env.NODE_ENV === "test" && (
            <span hidden>Submission Review App</span>
          )}
        </>
      </BrowserRouter>
    </Provider>
  );
}
