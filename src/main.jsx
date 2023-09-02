import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/main.scss";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { LanguageContext } from "./utils/dsvsdv.jsx";

  ReactDOM.createRoot(document.getElementById("root")).render(

      <BrowserRouter>
        <Provider store={store}>
          <LanguageContext.Provider>
          <App  />
          </LanguageContext.Provider>
        </Provider>
      </BrowserRouter>

  );


