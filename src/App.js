import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

function App({ basename }) {
  return (
    <React.Suspense fallback={<>Đang tải</>}>
      <BrowserRouter basename={basename}>
        <Routes />
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
