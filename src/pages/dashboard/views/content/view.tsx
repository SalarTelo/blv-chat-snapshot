import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatList from "./components/chat-list";
import Timeline from "./components/timeline";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { IProject } from "../../../../types/types";
import ProjectBar from "./components/project-bar";
import ChatInputArea from "./components/chat-input";
import {
  ChatContent,
  Content,
  Header,
  InputForm,
  MessageScroller,
  MessageWrapper,
  Wrapper
} from "./styled";
import { SET_OVERLAY_STATE, SET_SELECTED_PROJECT } from "../../../../redux/action-types";
import { BoldLG, FontSizes } from "../../../../components/Text";

const EmptyProjectMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  user-select: none;
`;

function View() {
  const selector = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject>({
    building_permit: false,
    construction: false,
    custom_request: "",
    description: "",
    dimensional_cert: false,
    energy_calculation: false,
    fire_doc: false,
    k_doc: false,
    ka: false,
    moisture_safety_description: false,
    rendering: false,
    u_value: false,
    va: false,
    vvs: false,
    createdAt: "",
    files: [],
    history: [],
    id: "",
    messages: [],
    name: "",
    propertyId: "",
    stage: 0,
    stageStatus: 0,
    updatedAt: "",
    users: []
  });

  const selectProject = (project: IProject) => {
    dispatch({
      type: SET_SELECTED_PROJECT,
      payload: project
    });
    setSelectedProject(project);
  };

  useEffect(() => {
    const list = selector.projects.filter(
      (project: IProject) => project.propertyId === selector.selectedPropertyId
    );
    setProjectList(list);
  }, [selector.projects]);

  useEffect(() => {
    const list = selector.projects.filter(
      (project: IProject) => project.propertyId === selector.selectedPropertyId
    );
    setProjectList(list);
    if (list.length > 0) {
      selectProject(list[0]);
    }
  }, [selector.selectedPropertyId]);

  return (
    <Wrapper>
      <Header>
        {/* A list of projects within selected property */}
        <ProjectBar
          projectList={projectList}
          selectedProject={selectedProject}
          onProjectSelect={selectProject}
        />

        {/* The progress of selected project */}
        <Timeline project={selectedProject} />
      </Header>

      <Content>
        {/* Where all the messages for a project gets displayed */}
        <ChatContent>
          <MessageWrapper>
            <MessageScroller>
              {selectedProject.messages.length > 0 ? (
                <ChatList />
              ) : (
                <EmptyProjectMessage>
                  <BoldLG fontSize={FontSizes.xxLarge}> No messages in this project!</BoldLG>
                </EmptyProjectMessage>
              )}
            </MessageScroller>
          </MessageWrapper>
        </ChatContent>

        {/* Where you write your text to selected project. */}
        <InputForm>
          <ChatInputArea />
        </InputForm>
      </Content>
    </Wrapper>
  );
}

export default View;
