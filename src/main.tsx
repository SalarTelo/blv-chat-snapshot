import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import { Provider } from "react-redux";
import ChatPage from "./pages/dashboard/dashboard-page";
import LoginPage from "./pages/login/page";
import { store } from "./redux/store";

function App() {
  // document.addEventListener('contextmenu', (event => {event.preventDefault();}));

  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
