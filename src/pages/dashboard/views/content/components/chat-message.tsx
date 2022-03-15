import styled from "styled-components";
import React from "react";
import { colors, font, gap, radius } from "../../../../../theme/variables";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${gap.medium};
  padding: ${gap.medium};
  border-radius: ${radius.normal};

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
const TimeStamp = styled.div`
  font-size: ${font.size.small};
  color: ${colors.gray};
`;
const MessageTitleName = styled.div`
  color: ${colors.darkGray};
  font-weight: ${font.weight.semiBold};
`;
const MessageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: ${gap.small};
`;
const MessageContent = styled.div`
  color: ${colors.darkGray};
  display: flex;
`;
const MessageLeft = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
`;
const MessageRight = styled.div`
  display: flex;
  flex-direction: column;
`;

type MessageProp = React.PropsWithChildren<{
  username: string;
  avatarURL: string;
  timeStamp: string;
}>;
export default function UserMessage({ children, avatarURL, username, timeStamp }: MessageProp) {
  return (
    <MessageContainer>
      <MessageLeft>
        <IconContainer src={avatarURL} alt="Profile Picture" />
      </MessageLeft>
      <MessageRight>
        <MessageHeader>
          <MessageTitleName>{username}</MessageTitleName>
          <TimeStamp>{timeStamp}</TimeStamp>
        </MessageHeader>
        <MessageContent>{children}</MessageContent>
      </MessageRight>
    </MessageContainer>
  );
}
