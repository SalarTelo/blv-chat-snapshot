import React from "react";
import styled from "styled-components";
import { colors, font, gap } from "../../../../theme/variables";

const messageList = [
  {
    id: 121251,
    username: "Jhona Alver",
    profileIconSrc: "https://picsum.photos/200/300",
    timeStamp: new Date().toISOString().substring(0, 10),
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 251421,
    username: "Dilan Badikanli",
    profileIconSrc: "https://picsum.photos/200/300",
    timeStamp: new Date().toISOString().substring(0, 10),
    message: "dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 415251,
    username: "Dilan Badikanli",
    profileIconSrc: "https://picsum.photos/200/300",
    timeStamp: new Date().toISOString().substring(0, 10),
    message: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 321251,
    username: "Jhona Alver",
    profileIconSrc: "https://picsum.photos/200/300",
    timeStamp: new Date().toISOString().substring(0, 10),
    message: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum."
  }
];

const Container = styled.div`
  font-size: ${font.size.medium};
  font-weight: ${font.weight.thin};
  color: ${colors.darkGray};
  height: 100%;
`;
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${gap.medium};
  padding: ${gap.medium};
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
  profileIconSrc: string;
  timeStamp: string;
}>;
function UserMessage({ children, profileIconSrc, username, timeStamp }: MessageProp) {
  return (
    <MessageContainer>
      <MessageLeft>
        <IconContainer src={profileIconSrc} alt="Profile Picture" />
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
function ChatBoxContainer() {

  return (
    <Container>
      <MessageList>
        {messageList.map((value) => {
          return (
            <UserMessage
              username={value.username}
              profileIconSrc="https://picsum.photos/200/300"
              timeStamp={new Date().toISOString().substring(0, 10)}
            >
              {value.message}
            </UserMessage>
          );
        })}
      </MessageList>
    </Container>
  );
}

export default ChatBoxContainer;
