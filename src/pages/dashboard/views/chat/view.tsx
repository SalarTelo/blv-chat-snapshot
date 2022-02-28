import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { colors, font, gap, shadow } from "../../../../theme/variables";
import { VerticalSeparator } from "../../../../components/atom/separator";
import { PlusButton } from "../../../../components/atom/buttons";
import Chatbox from "./chat-box";
import { IProject } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { SET_SELECTED_PROJECT } from "../../../../redux/action-types";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: ${font.weight.semiBold};
  color: ${colors.darkGray};
  padding: ${gap.medium};
  gap: ${gap.large};
  font-size: ${gap.medium};
`;
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 ${gap.xxLarge};
  justify-content: center;
  margin-bottom: ${gap.large};
  align-items: center;
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: ${gap.large} ${gap.small} 0 ${gap.small};
`;
const InputContainer = styled.div`
  border-top-style: solid;
  border-width: 2px;
  border-color: ${colors.lightGray};
`;

enum TimelineConnectorState {
  UfToUf,
  IpToUF,
  FToIP
}
function TimelineConnector({ state }: { state: TimelineConnectorState }) {
  const GetColor = () => {
    switch (state) {
      case TimelineConnectorState.FToIP:
        return colors.green;
      case TimelineConnectorState.UfToUf:
        return colors.gray;
      case TimelineConnectorState.IpToUF:
        return colors.gray;
      default:
        return colors.black;
    }
  };
  const style = {
    flex: 1,
    height: gap.small,
    backgroundColor: GetColor(),
    boxShadow: shadow.defaultBox
  };
  return <div style={style} />;
}
enum TimelineTabState {
  unfinished,
  inProgress,
  finished
}
function TimelineTab({ state, label }: { state: TimelineTabState; label: string }) {
  const GetButtonColor = () => {
    switch (state) {
      case TimelineTabState.finished:
        return colors.green;
      case TimelineTabState.inProgress:
        return colors.yellow;
      case TimelineTabState.unfinished:
        return colors.gray;

      default:
        return colors.black;
    }
  };
  const GetTextColor = () => {
    switch (state) {
      case TimelineTabState.finished:
        return colors.darkGreen;
      case TimelineTabState.inProgress:
        return colors.darkYellow;
      case TimelineTabState.unfinished:
        return colors.darkGray;

      default:
        return colors.black;
    }
  };
  const GetSize = () => {
    switch (state) {
      case TimelineTabState.inProgress:
        return "21px";
      default:
        return "16px";
    }
  };

  const style = {
    container: {
      backgroundColor: GetButtonColor(),
      width: GetSize(),
      height: GetSize(),
      borderRadius: "4px",
      boxShadow: shadow.defaultBox,
      position: "relative"
    },
    text: {
      marginTop: "24px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0,
      left: "-50%",
      fontWeight: state === TimelineTabState.inProgress ? font.weight.bold : font.weight.semiBold,
      color: GetTextColor(),
      textShadow: shadow.defaultText,
      userSelect: "none"
    }
  };
  return (
    <div style={style.container}>
      <div style={style.text}>{label}</div>
    </div>
  );
}
function ChatTextArea({ onSubmit }: { onSubmit?: React.KeyboardEvent<HTMLTextAreaElement> }) {
  const style = {
    width: "100%",
    height: "100%",
    borderStyle: "none",
    resize: "none",
    fontSize: font.size.medium,
    fontWeight: 300,
    fontFamily: "open sans",
    padding: gap.small,
    outlineStyle: "none"
  };
  return <TextareaAutosize style={style} placeholder="Write here..." onKeyUp={onSubmit} />;
}
function View() {
  const [projectList, setProjectList] = useState<IProject[]>();
  const selector = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [selectedProject, setSelectedProject] = useState<IProject>();

  useEffect(() => {
    const list = selector.projectList.filter(
      (project: IProject) => project.propertyId === selector.selectedPropertyId
    );
    if (list.length > 0) {
      setProjectList(list);
      setSelectedProject(list[0]);
    }
  }, [selector.selectedPropertyId]);

  function onSelectProject(project: IProject) {
    setSelectedProject(project);
    dispatch({
      type: SET_SELECTED_PROJECT,
      payload: project
    });
  }

  if (selector.selectedPropertyId === "") return <></>;

  return (
    <ChatWrapper>
      <ProjectContainer>
        {projectList?.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => {
                onSelectProject(project);
              }}
              style={{
                cursor: "pointer",
                userSelect: "none",
                opacity: selectedProject?.id === project.id ? 1 : 0.6
              }}
            >
              {project.name}
            </div>
          );
        })}
        <VerticalSeparator color={colors.gray} length={16} />
        <PlusButton height={13} width={13} />
      </ProjectContainer>
      <TimelineContainer>
        <TimelineTab state={TimelineTabState.finished} label="Start Project!" />
        <TimelineConnector state={TimelineConnectorState.FToIP} />
        <TimelineTab state={TimelineTabState.inProgress} label="Task 1" />
        <TimelineConnector state={TimelineConnectorState.IpToUF} />
        <TimelineTab state={TimelineTabState.unfinished} label="Task 2" />
        <TimelineConnector state={TimelineConnectorState.UfToUf} />
        <TimelineTab state={TimelineTabState.unfinished} label="Task 3" />
        <TimelineConnector state={TimelineConnectorState.UfToUf} />
        <TimelineTab state={TimelineTabState.unfinished} label="Task 4" />
        <TimelineConnector state={TimelineConnectorState.UfToUf} />
        <TimelineTab state={TimelineTabState.unfinished} label="Finish Project!" />
      </TimelineContainer>
      <MessageContainer>
        <Chatbox />
      </MessageContainer>
      <InputContainer>
        <ChatTextArea />
      </InputContainer>
    </ChatWrapper>
  );
}

export default View;