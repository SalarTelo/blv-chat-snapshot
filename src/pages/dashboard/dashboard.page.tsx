import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ServerView from "./views/server-bar/view";
import ProjectView from "./views/project-bar/view";
import ChatView from "./views/content/view";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  SET_INIT_DATA,
  SET_SELECTED_COMPANY,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY
} from "../../redux/action-types";
import { ICompany, IFile, IHistory, IProject, IProperty, IUser } from "../../types/types";
import { colors, font } from "../../theme/variables";
import FormOverlay from "./overlay/overlay";

const Wrapper = styled.main`
  display: flex;
  flex-direction: row;
  height: 100%;
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
      <FormOverlay />
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
        alignItems: "center",
        fontSize: font.size.xLarge,
        color: colors.darkGray,
        fontWeight: font.weight.semiBold
      }}
    >
      No active project selected!
    </div>
  );
}
function DashboardPage() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);
  useEffect(() => {
    axios
      .get("http://localhost:5545/api/v1/user/4bb8cac5-87e1-4d22-8d36-ecf6e662f0ff")
      .then((res) => {
        const projects: IProject[] = [];
        const properties: IProperty[] = [];
        const companies: ICompany[] = [];
        const histories: IHistory[] = [];
        const users: IUser[] = [];
        const files: IFile[] = [];

        const userData: IUser = {
          id: res.data.record.id,
          name: res.data.record.name,
          avatarURL: res.data.record.avatarURL
        };

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
          dispatch({ type: SET_SELECTED_COMPANY, payload: initCompany });
          dispatch({ type: SET_SELECTED_PROPERTY, payload: initProperty });
          dispatch({ type: SET_SELECTED_PROJECT, payload: initProject });
        }
      });
  }, []);

  return (
    <Wrapper>
      {/* Server Navbar */}
      <Sidebar>
        <ServerView />
      </Sidebar>

      {selector.selectedProjectId !== "" ? (
        <DisplayDashboard overlayState={selector.overlayState} />
      ) : (
        <NoProjectSelect />
      )}
    </Wrapper>
  );
}
export default DashboardPage;
