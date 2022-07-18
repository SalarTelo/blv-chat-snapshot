import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./index.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { useLocalStorage } from "usehooks-ts";
import Modal from "./components/modal";
import DashboardPage from "./pages/dashboard/dashboard.page";
import LoginPage from "./pages/login/page";
import RegisterPage from "./pages/register/page";
import { store } from "./redux/store";

import SocketIo from "./utils/socketIO";
import { useAppSelector } from "./redux/hooks";

const ModalLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
`;

function Main() {
  const [token] = useLocalStorage("auth_token", "");
  useEffect(() => {
    SocketIo.Connect();
    return () => {
      SocketIo.Disconnect();
    };
  }, []);

  // TODO: Look into private routers and proper authentication
  const RedirectEndpoint = (): string => {
    if (token === "") return "login";
    return "dashboard";
  };

  return (
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={RedirectEndpoint()} />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
      {/* Modal Setup */}
      <Modal>
        <ModalLayer id="modal-forms" />
        <ModalLayer id="modal-popup" />
        <ModalLayer id="modal-tooltip" />
      </Modal>
    </Provider>
  );
}
ReactDOM.render(<Main />, document.getElementById("root"));
