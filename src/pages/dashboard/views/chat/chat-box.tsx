import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { colors, font, gap } from "../../../../theme/variables";
import { IMessage, IProject, IUser } from "../../../../types/types";
import { useAppSelector } from "../../../../redux/hooks";

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

function Chatbox() {
  const [messageList, setMessageList] = useState<IMessage[]>();
  const [userList, setUserList] = useState<IUser[]>();
  const selector = useAppSelector((state) => state.app);

  useEffect(() => {
    const projects: IProject[] = selector.projectList.filter(
      (project: IProject) => project.id === selector.selectedProjectId
    );
    if (projects.length > 0) {
      const project = projects[0];
      setMessageList(project.messages);
      setUserList(project.users);
    } else {
      setMessageList([]);
    }
  }, [selector.selectedPropertyId, selector.selectedProjectId]);

  function GetUserFromMessage(message: IMessage) {
    if (userList && userList?.length > 0) {
      const users: IUser[] = userList.filter((user: IUser) => message.userId === user.id);
      if (users.length > 0){
        return users[0];
      }
      return null;
    }
  }
  function GetMessageUsername(message: IMessage): string {
    const user = GetUserFromMessage(message);
    if (user)
      return user.name;
    return "User Has No Name";
  }

  return (
    <Container>
      <MessageList>
        {messageList
          ? messageList.map((message) => {
              return (
                <UserMessage
                  key={message.id}
                  username={GetMessageUsername(message)}
                  profileIconSrc={GetUserFromMessage(message)?.profilePictureURL}
                  timeStamp={new Date().toISOString().substring(0, 10)}
                >
                  {message.message}
                </UserMessage>
              );
            })
          : ""}
      </MessageList>
    </Container>
  );
}

export default Chatbox;
