import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatList from "./components/chat-list";
import Timeline from "./components/timeline";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { IMessage, IProject } from "../../../../types/types";
import ProjectList from "./components/project-list";
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
import { SET_SELECTED_PROJECT } from "../../../../redux/action-types";
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
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [selectedProject, setSelectedProject] = useState<IProject>({});

  const selectProject = (project: IProject) => {
    setSelectedProject(project);
    dispatch({
      type: SET_SELECTED_PROJECT,
      payload: project
    });
  };

  useEffect(() => {
    const projects: IProject[] = selector.projects.filter(
      (project: IProject) => project.id === selector.selectedProjectId
    );
    const messages: IMessage[] = projects[0].messages.sort((a, b) =>
      a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
    );
    selectProject(projects[0]);
    setMessageList(messages);
  }, [selector.selectedProjectId, selector.projects]);
  useEffect(() => {
    const list: IProject[] = selector.projects.filter(
      (project: IProject) => project.propertyId === selector.selectedPropertyId
    );
    if (list.length > 0) {
      selectProject(list[0]);
    }
  }, [selector.selectedPropertyId]);

  return (
    <Wrapper>
      <Header>
        {/* A list of projects within selected property */}
        <ProjectList
          projectList={selector.projects.filter(
            (project: IProject) => project.propertyId === selector.selectedPropertyId
          )}
          selectedProject={selectedProject}
          onProjectSelect={selectProject}
        />

        {/* The progress of selected project */}
        <Timeline stage={selectedProject.stage} stageStatus={selectedProject.stageStatus} />
      </Header>

      <Content>
        {/* Where all the messages for a project gets displayed */}
        <ChatContent>
          {messageList.length > 0 ? (
            <ChatList messages={messageList} users={selectedProject.users} />
          ) : (
            <EmptyProjectMessage>
              <BoldLG fontSize={FontSizes.xxLarge}> No messages in this project!</BoldLG>
            </EmptyProjectMessage>
          )}
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
