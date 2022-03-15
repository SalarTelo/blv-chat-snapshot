import styled from "styled-components";
import React from "react";
import { colors, font, gap, shadow } from "../../../../../theme/variables";
import { IProject } from "../../../../../types/types";

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 ${gap.xxLarge};
  justify-content: center;
  margin-bottom: ${gap.large};
  align-items: center;
  white-space: nowrap;
`;
enum TimelineTabState {
  unfinished,
  inProgress,
  finished,
  halted
}
enum TimelineConnectorState {
  Unfinished2Unfinished,
  InProgress2Unfinished,
  Finished2InProgress,
  Finished2Finished
}
function TimelineConnector({ state }: { state: TimelineConnectorState }) {
  const GetColor = () => {
    switch (state) {
      case TimelineConnectorState.Finished2Finished:
        return colors.green;
      case TimelineConnectorState.Finished2InProgress:
        return colors.yellow;
      case TimelineConnectorState.Unfinished2Unfinished:
        return colors.gray;
      case TimelineConnectorState.InProgress2Unfinished:
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
        return font.size.medium;
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
      userSelect: "none",
      opacity: state === TimelineTabState.inProgress ? 1 : 0.6
    }
  };
  return (
    <div style={style.container}>
      <div style={style.text}>{label}</div>
    </div>
  );
}

export default function Timeline({ project }: { project: IProject }) {
  const GetTabState = (index: number): TimelineTabState => {
    if (project.stage > index) return TimelineTabState.finished;
    if (project.stage < index) return TimelineTabState.unfinished;
    if (project.stageStatus === -1) return TimelineTabState.halted;
    return TimelineTabState.inProgress;
  };
  const GetConnectorState = (index: number): TimelineConnectorState => {
    // A very gross and ugly way of doing this but hey I dont get paid fo this yet :)
    if (project.stage > index) {
      if (project.stage - index === 1) return TimelineConnectorState.Finished2InProgress;

      return TimelineConnectorState.Finished2Finished;
    }
    if (project.stage < index && index - project.stage === 1)
      return TimelineConnectorState.InProgress2Unfinished;

    return TimelineConnectorState.Unfinished2Unfinished;
  };

  return (
    <TimelineContainer>
      <TimelineTab state={GetTabState(0)} label="Task 1" />
      <TimelineConnector state={GetConnectorState(0)} />
      <TimelineTab state={GetTabState(1)} label="Task 2" />
      <TimelineConnector state={GetConnectorState(1)} />
      <TimelineTab state={GetTabState(2)} label="Task 3" />
      <TimelineConnector state={GetConnectorState(2)} />
      <TimelineTab state={GetTabState(3)} label="Task 4" />
      <TimelineConnector state={GetConnectorState(3)} />
      <TimelineTab state={GetTabState(4)} label="Task 5" />
    </TimelineContainer>
  );
}
