import styled from "styled-components";
import React from "react";
import { colors, font, gap, radius, shadow } from "../../theme/variables";
import { TabState } from "../../pages/dashboard/views/content/components/timeline-tab";
import { FontSizes, RegularDG } from "../Text";
import Modal from "../modal";
import MilestoneFinishForm from "../../pages/dashboard/overlay/milestone-finish-form";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 999;
  padding: ${gap.medium};
  gap: ${gap.small};
  width: 200px;
  background-color: ${colors.lightGray};
  box-shadow: ${shadow.defaultBox};

  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.13);
  border-radius: ${radius.medium};
`;
const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${gap.small};
  font-size: ${font.size.medium};
  cursor: pointer;
  user-select: none;
  flex: 1;
  font-weight: ${font.weight.semiBold};
  border-radius: ${radius.medium};
  background-color: #e7e7e7;
  color: ${colors.gray};

  &:hover {
    color: ${colors.darkGray};
  }
  &:active {
    opacity: 0.7;
  }
`;

const GetStatusText = (state: TabState) => {
  switch (state) {
    case TabState.Unfinished:
      return "Not Started!";
    case TabState.InProgress:
      return "In Progress...";
    case TabState.Finished:
      return "Finished!";
    case TabState.Halted:
      return "Halted...";
  }
};
const GetStatusColor = (state: TabState) => {
  switch (state) {
    case TabState.Unfinished:
      return colors.gray;
    case TabState.InProgress:
      return colors.darkYellow;
    case TabState.Finished:
      return colors.darkGreen;
    case TabState.Halted:
      return colors.darkRed;
    default:
      return colors.black;
  }
};

type propTypes = {
  state: TabState;
  title: string;
  onFinish?: () => void;
  position?: {
    x: number;
    y: number;
  };
} & React.HTMLProps<HTMLDivElement>;
export default function TimelinePopup({
  state,
  title,
  onFinish,
  position,
  ...props
}: propTypes) {
  return (
    <Container
      {...props}
      style={{
        left: position?.x || 0,
        top: position?.y || 0
      }}
    >
      <RegularDG
        fontSize={FontSizes.medium}
        style={{
          alignSelf: state === TabState.InProgress ? "" : "center"
        }}
      >
        Status: <span style={{ color: GetStatusColor(state) }}>{GetStatusText(state)}</span>
      </RegularDG>
      {state === TabState.InProgress ? (
        <Content>
          <Button onClick={onFinish}>Finish</Button>
        </Content>
      ) : (
        ""
      )}
    </Container>
  );
}
