import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors, font, gap } from "../../../../../theme/variables";
import TimelinePopup from "../../../../../components/popups/timeline-popup";

export enum TabState {
  Unfinished,
  InProgress,
  Finished,
  Halted
}
const Label = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  top: 20px;
  pointer-events: none;
  position: absolute;
  font-weight: ${font.weight.semiBold};
`;
const Container = styled.div`
  display: flex;
  position: relative;
  height: ${gap.small};
  justify-content: center;
  align-items: center;
`;
const Tab = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 20%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.9;
  }
`;
const GetButtonColor = (state: TabState) => {
  switch (state) {
    case TabState.Finished:
      return colors.green;
    case TabState.InProgress:
      return colors.yellow;
    case TabState.Unfinished:
      return colors.lightGray;
    case TabState.Halted:
      return colors.red;
    default:
      return colors.black;
  }
};
type propTypes = {
  state: TabState;
  label: string;
  showStatus: boolean;
  onFinish: () => void;
} & React.HTMLProps<HTMLDivElement>;
export default function TimeLineTab({
  state,
  showStatus,
  onFinish,
  label,
  ...props
}: propTypes) {
  const style = {
    container: {
      width: state === TabState.InProgress || state === TabState.Halted ? "20px" : "",
      height: state === TabState.InProgress || state === TabState.Halted ? "20px" : "",
      backgroundColor: GetButtonColor(state)
    }
  };

  return (
    <Container>
      <Tab style={style.container} {...props} />

      <Label
        style={{
          color: state === TabState.Halted ? colors.darkRed : colors.darkGray,
          opacity: state === TabState.InProgress || state === TabState.Halted ? 1 : 0.1
        }}
      >
        {label}
      </Label>

      {showStatus ? (
        <TimelinePopup
          onFinish={onFinish}
          position={{ x: -85, y: 20 }}
          state={state}
          title={label}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
