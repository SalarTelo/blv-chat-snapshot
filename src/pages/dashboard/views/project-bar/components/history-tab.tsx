import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gap } from "../../../../../theme/variables";
import SidebarTab from "./tab-template";
import HistoryTabFooter from "./history-tab-footer";
import HistoryCard from "./history-card";
import { IHistory, IUser } from "../../../../../types/types";
import { useAppSelector } from "../../../../../redux/hooks";
import { BoldDG, BoldG, FontSizes } from "../../../../../components/Text";
/*
 TODO: remove this later when history is properly created.

 Types of historic events:
 --------------------------------
   0 = offer sent
   1 = decline offer
   2 = accept offer
   3 = file upload
   4 = event notification
   5 = general notification
 --------------------------------
 */

const Content = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  width: 300px;
  flex-direction: column;
  gap: ${gap.medium};
`;

export default function HistoryTab() {
  const [projectHistory, setProjectHistory] = useState<IHistory[]>([]);
  const selector = useAppSelector((state) => state.app);

  useEffect(() => {
    const list = selector.histories.filter(
      (history: IHistory) => history.projectId === selector.selectedProjectId
    );
    const sortedList = list.sort((first: IHistory, second: IHistory) =>
      first.createdAt < second.createdAt ? -1 : 0
    );
    setProjectHistory(sortedList);
  }, [selector.selectedProjectId, selector.histories]);

  const GetSender = (card: IHistory): IUser => {
    const users: IUser[] = selector.users.filter((user: IUser) => user.id === card.senderId);
    return users[0];
  };

  const onRequestResponse = () => {};
  return (
    <SidebarTab
      title="History"
      subTitle="This has happened..."
      width="100%"
      footer={<HistoryTabFooter onRequestRes={onRequestResponse} />}
    >
      <Content>
        {projectHistory.length > 0 ? (
          projectHistory.map((event) => {
            return <HistoryCard key={event.id} cardData={event} senderData={GetSender(event)} />;
          })
        ) : (
          <BoldG
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
            fontSize={FontSizes.xLarge}
          >
            History empty!
          </BoldG>
        )}
      </Content>
    </SidebarTab>
  );
}
