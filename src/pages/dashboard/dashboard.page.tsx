import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import ServerView from "./views/server-bar/view";
import ProjectView from "./views/project-bar/view";
import ChatView from "./views/content/view";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ADD_MESSAGE,
  SET_INIT_DATA,
  SET_OVERLAY_STATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY,
  SET_USER_DATA
} from "../../redux/action-types";
import { ICompany, IFile, IHistory, IMessage, IProject, IProperty, IUser } from "../../types/types";
import FormOverlay from "./overlay/overlay";
import { BoldDG, FontSizes } from "../../components/Text";
import SOCKET, { socket } from "../../utils/socketIO";
import config from "../../../app.config";

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
  position: relative;
`;
const Content = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const Sidebar = styled.section`
  display: flex;
`;

function DisplayDashboard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative"
      }}
    >
      {/* Content Center */}
      <Content>
        <ChatView />
      </Content>
      {/* Project Navbar */}
      <Sidebar>
        <ProjectView />
      </Sidebar>
    </div>
  );
}
function NoProjectSelect() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <BoldDG fontSize={FontSizes.xxLarge}> No Active Projects </BoldDG>
    </div>
  );
}

export default function Dashboard() {
  const [userData] = useLocalStorage<IUser>("user_data", {});
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch({
      type: SET_USER_DATA,
      payload: userData
    });
    axios
      .get(`http://${config.host}:${config.api_port}/api/v1/user/${userData.id}`, {

      })
      .then((res) => {
        const projects: IProject[] = [];
        const properties: IProperty[] = [];
        const companies: ICompany[] = [];
        const histories: IHistory[] = [];
        const users: IUser[] = [];
        const files: IFile[] = [];

        // Don't judge me.
        // I know I can just lazy load and dispatch these instead of filling an array to send one big payload...
        // I am just to lazy to rewrite :)
        res.data.record.companies.forEach((company: ICompany) => {
          companies.push(company);
          company.users.forEach((user: IUser) => {
            users.push(user);
          });
          company.properties.forEach((property: IProperty) => {
            properties.push(property);
            property.projects.forEach((project: IProject) => {
              projects.push(project);
              project.files.forEach((file: IFile) => {
                files.push(file);
              });
              project.history.forEach((history: IHistory) => {
                histories.push(history);
              });
            });
          });
        });
        SOCKET.Login({
          userData,
          projects
        });

        const initPayload = {
          userData,
          companies,
          properties,
          projects,
          histories,
          files,
          users
        };
        dispatch({ type: SET_INIT_DATA, payload: initPayload });
        if (projects.length > 0) {
          const initProject: IProject = projects[0];
          const initProperty: IProperty = properties.filter(
            (property) => property.id === initProject.propertyId
          )[0];
          const initCompany: ICompany = companies.filter(
            (company) => company.id === initProperty.companyId
          )[0];
          // dispatch({ type: SET_SELECTED_COMPANY, payload: initCompany });
          dispatch({ type: SET_SELECTED_PROPERTY, payload: initProperty });
          dispatch({ type: SET_SELECTED_PROJECT, payload: initProject });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    socket.on("MESSAGE:RECEIVE", (message: IMessage) => {
      dispatch({
        type: ADD_MESSAGE,
        payload: message
      });
    });
  }, []);

  return (
    <Wrapper
      onDragEnter={(e) => {
        if (e.dataTransfer.types.length > 0) {
          dispatch({
            type: SET_OVERLAY_STATE,
            payload: 4
          });
        }
      }}
    >
      <FormOverlay />
      {/* Server Navbar */}
      <Sidebar>
        <ServerView />
      </Sidebar>

      {selector.selectedProjectId !== "" ? <DisplayDashboard /> : <NoProjectSelect />}
    </Wrapper>
  );
}
