import React, { useEffect, useState } from "react";
import axios from "axios";
import ServerView from "./views/server/view";
import ProjectView from "./views/project/view";
import ChatView from "./views/chat/view";
import StyleCSS from "./stylesheet.module.scss";
import { useAppDispatch } from "../../redux/hooks";
import { SET_INIT_DATA } from "../../redux/action-types";
import { ICompany, IProject, IProperty, IUser } from "../../types/types";

function DashboardPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5545/api/v1/user/4bb8cac5-87e1-4d22-8d36-ecf6e662f0ff")
      .then((res) => {
        const projectList: IProject[] = [];
        const propertyList: IProperty[] = [];
        const companyList: ICompany[] = [];
        const userData: IUser = {
          id: res.data.record.id,
          name: res.data.record.name
        };
        res.data.record.companies.forEach((company: ICompany) => {
          companyList.push(company);
          company.properties.forEach((property: IProperty) => {
            propertyList.push(property);
            property.projects.forEach((project: IProject) => {
              projectList.push(project);
            });
          });
        });

        const payload = {
          userData,
          companyList,
          propertyList,
          projectList,
          selectedProjectId: "",
          selectedPropertyId: ""
        };
        dispatch({ type: SET_INIT_DATA, payload });
      });
  }, []);

  return (
    <main className={StyleCSS.wrapper}>
      {/* Server Navbar */}
      <section className={StyleCSS.sidebar}>
        <ServerView />
      </section>

      {/* Chat Navbar */}
      <section className={StyleCSS.content}>
        <ChatView />
      </section>

      {/* Project Navbar */}
      <section className={StyleCSS.sidebar}>
        <ProjectView />
      </section>
    </main>
  );
}

export default DashboardPage;
