import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Pages
import ChatPage from "./pages/dashboard/dashboard-page";
import LoginPage from "./pages/login/page";

function App() {
  //document.addEventListener('contextmenu', (event => {event.preventDefault();}));

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
