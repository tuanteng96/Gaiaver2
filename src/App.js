import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";

function App({ basename }) {
  return (
    <React.Suspense fallback={<>Đang tải</>}>
      <BrowserRouter basename={basename}>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
