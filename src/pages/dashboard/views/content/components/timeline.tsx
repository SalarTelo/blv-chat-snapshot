import styled from "styled-components";
import React, { useState } from "react";
import { DateTime } from "luxon";
import TimelineTab, { TabState } from "./timeline-tab";
import TimelineConnector, { ConnectorState } from "./timeline-connector";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { SET_PROJECT_STATUS } from "../../../../../redux/action-types";
import Modal from "../../../../../components/modal";
import MilestoneFinishForm from "../../../overlay/milestone-finish-form";
import SOCKET from "../../../../../utils/socketIO";
import { IMessage } from "../../../../../types/types";

const Labels = [
  {
    unfinished: "Inväntar Underlag",
    finished: "Mottagit Underlag!",
    halted: "Underlag Saknas!"
  },
  {
    unfinished: "Deligerar arbete",
    finished: "Arbete Deligerat!",
    halted: ""
  },
  {
    unfinished: "Inväntar arbete",
    finished: "Arbetet Utfört!",
    halted: ""
  },

  {
    unfinished: "Inväntar Från Kommun",
    finished: "Bygglov Godkänt!",
    halted: "Kompletering krävs!"
  }
];
const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  pointer-events: auto;
  height: 20px;
`;
const Container = styled.div`
  display: flex;
  padding: 0 100px;

  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
`;
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const getLabel = (state: TabState, index: number): string => {
  if (index > 3 || index < 0) return `INDEX OUT OF BOUNDS: ${index}`;
  switch (state) {
    case TabState.Finished:
      return Labels[index].finished;
    case TabState.Halted:
      return Labels[index].halted;
    case TabState.InProgress:
      return Labels[index].unfinished;
    case TabState.Unfinished:
      return Labels[index].unfinished;

    default:
      return "";
  }
};
export default function Timeline({ stage, stageStatus }: { stage: number; stageStatus: number }) {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((selector) => selector.app);
  const [selectedTabIndex, setTabIndex] = useState<number>(-1);
  const [showFinishForm, setFinishForm] = useState<boolean>(false);

  const getTabState = (index: number): TabState => {
    if (stage > index) return TabState.Finished;
    if (stage < index) return TabState.Unfinished;
    if (stageStatus === -1) return TabState.Halted;
    return TabState.InProgress;
  };

  const getConnectorState = (index: number): ConnectorState => {
    // A very gross and ugly way of doing this but hey I don't get paid fo this yet :)

    if (stage > index) {
      if (stage - index === 1) {
        if (stageStatus === -1) return ConnectorState.Finished2Halted;
        return ConnectorState.Finished2InProgress;
      }
      return ConnectorState.Finished2Finished;
    }
    if (stage < index && index - stage === 1) return ConnectorState.InProgress2Unfinished;
    return ConnectorState.Unfinished2Unfinished;
  };
  const finishFormClose = () => {
    setFinishForm(false);
    setTabIndex(-1);
  };
  const handleFinishFormSubmit = (summary: string) => {
    const messageData: IMessage = {
      content: summary,
      createdAt: DateTime.now().toISO(),
      files: [],
      id: "",
      projectId: selector.selectedProjectId,
      type: 1,
      updatedAt: "",
      userId: ""
    };
    SOCKET.SendMessage(messageData);
    finishFormClose();
  };

  return (
    <Wrapper>
      {showFinishForm ? (
        <Modal parent="modal-forms">
          <MilestoneFinishForm onSubmit={handleFinishFormSubmit} onCancel={finishFormClose} />
        </Modal>
      ) : (
        ""
      )}
      <Container>
        <TimelineContainer>
          {Labels.map((element, index) => (
            <React.Fragment key={element.finished}>
              <TimelineTab
                onFinish={() => {
                  setFinishForm(true);
                  dispatch({
                    type: SET_PROJECT_STATUS,
                    payload: 1
                  });
                }}
                onClick={() => {
                  setTabIndex((prev) => (prev === index ? -1 : index));
                }}
                showStatus={selectedTabIndex === index}
                state={getTabState(index)}
                label={getLabel(getTabState(index), index)}
              />
              {index !== Labels.length - 1 ? (
                <TimelineConnector state={getConnectorState(index)} />
              ) : (
                ""
              )}
            </React.Fragment>
          ))}
        </TimelineContainer>
      </Container>
    </Wrapper>
  );
}
