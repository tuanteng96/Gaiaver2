import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./_ezs/_assets/sass/style.react.scss";
import reportWebVitals from "./reportWebVitals";
import * as _redux from "./redux";
import axiosClient from "./redux/axiosClient";
import { Provider } from 'react-redux'
import { store } from "./redux/store";

_redux.setupAxios(axiosClient, store);

const { PUBLIC_URL } = process.env;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App basename={PUBLIC_URL} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
