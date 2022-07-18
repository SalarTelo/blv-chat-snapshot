import styled from "styled-components";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { colors, gap, radius } from "../../../../../theme/variables";
import { BoldDG, FontSizes, RegularG, SemiDG } from "../../../../../components/Text";
import { IMessage, IUser } from "../../../../../types/types";
import BasicMessage from "./messages-types/basic-message";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: ${gap.small};
  padding: ${gap.small};
  border-radius: ${radius.medium};

  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const IconContainer = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  user-select: auto;
`;

const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${gap.small};
`;
const MessageContent = styled.div`
  display: flex;
`;
const Left = styled.div`
  display: flex;
  padding: ${gap.xSmall};
`;
const Content = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 4px;
  flex-direction: column;
`;
const FormatDate = (iso: string, short = false) => {
  return DateTime.fromISO(iso).toLocaleString({ dateStyle: short ? "short" : "long" });
};
type MessageProp = React.PropsWithChildren<{
  authorData: IUser;
  messageData: IMessage;
}>;
export function UserMessage({ authorData, messageData }: MessageProp) {
  return (
    <Container>
      <Left>
        <IconContainer draggable={false} src={authorData.avatarURL} alt="Profile Picture" />
      </Left>
      <Content>
        <MessageHeader>
          <BoldDG fontSize={FontSizes.medium}>{authorData.displayName}</BoldDG>
          <RegularG fontSize={FontSizes.small}>{FormatDate(messageData.createdAt)}</RegularG>
        </MessageHeader>
        <MessageContent>
          <BasicMessage messageData={messageData} />
        </MessageContent>
      </Content>
    </Container>
  );
}
export function AppendedMessage({ authorData, messageData }: MessageProp) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const styles = {
    timestamp: {
      visibility: isHovering ? "visible" : "hidden",
      display: "flex",
      alignItems: "center",
      userSelect: "none"
    }
  };
  return (
    <Container onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <MessageContent style={{ marginLeft: "56px" }}>
          <BasicMessage messageData={messageData} />
        </MessageContent>
        <div style={styles.timestamp}>
          <RegularG fontSize={FontSizes.small}>{FormatDate(messageData.createdAt, true)}</RegularG>
        </div>
      </div>
    </Container>
  );
}
