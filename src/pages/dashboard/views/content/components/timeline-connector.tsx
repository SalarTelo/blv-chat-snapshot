import React from "react";
import styled from "styled-components";
import { colors, gap, shadow } from "../../../../../theme/variables";

export enum ConnectorState {
  Unfinished2Unfinished,
  InProgress2Unfinished,
  Finished2InProgress,
  Finished2Finished,
  Finished2Halted
}
const Connector = styled.div`
  flex: 1;
  height: ${gap.small};
  justify-content: center;
  align-items: center;
  box-shadow: ${shadow.defaultBox};
`;

export default function TimelineConnector({ state }: { state: ConnectorState }) {
  const GetColor = () => {
    switch (state) {
      case ConnectorState.Finished2Finished:
        return colors.green;
      case ConnectorState.Finished2InProgress:
        return "linear-gradient(90deg, rgba(161,255,117,1) 0%, rgba(255,225,117,1) 80%)";
      case ConnectorState.Unfinished2Unfinished:
        return colors.lightGray;
      case ConnectorState.InProgress2Unfinished:
        return colors.lightGray;
      case ConnectorState.Finished2Halted:
        return "linear-gradient(90deg, rgba(161,255,117,1) 0%, rgba(255, 148, 148, 1)";
      default:
        return colors.black;
    }
  };
  const style = {
    background: GetColor()
  };

  return <Connector style={style} />;
}
