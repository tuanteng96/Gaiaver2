import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import AuthInit from "./pages/Auth/_redux/AuthInit";

function App({ basename }) {
  return (
    <React.Suspense fallback={<>Đang tải</>}>
      <BrowserRouter basename={basename}>
        <AuthInit>
          <Routes />
        </AuthInit>
        <ToastContainer />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
