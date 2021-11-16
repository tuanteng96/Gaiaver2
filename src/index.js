import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import "./_assets/scss/style.react.scss";
import reportWebVitals from './reportWebVitals';
import * as _redux from "./redux";
import axiosClient from "./redux/axiosClient";

_redux.setupAxios(axiosClient);

const { PUBLIC_URL } = process.env;

ReactDOM.render(
  <React.StrictMode>
    <App basename={PUBLIC_URL}/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
