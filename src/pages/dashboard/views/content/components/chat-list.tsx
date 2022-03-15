import React, { useEffect, useState } from "react";
import { IMessage, IProject, IUser } from "../../../../../types/types";
import { useAppSelector } from "../../../../../redux/hooks";
import UserMessage from "./chat-message";

function ChatList() {
  const [messageList, setMessageList] = useState<IMessage[]>();
  const [userList, setUserList] = useState<IUser[]>();
  const selector = useAppSelector((state) => state.app);

  useEffect(() => {
    const projects: IProject[] = selector.projects.filter(
      (project: IProject) => project.id === selector.selectedProjectId
    );
    if (projects.length > 0) {
      const project = projects[0];
      setMessageList(project.messages.sort((a: IMessage, b: IMessage) => (a.createdAt < b.createdAt ? -1 : ((a.createdAt > b.createdAt) ? 1 : 0))));
      setUserList(project.users);
    } else {
      setMessageList([]);
    }
  }, [selector.selectedPropertyId, selector.projects, selector.selectedProjectId]);

  function GetUserFromMessage(message: IMessage): IUser {
    if (userList && userList?.length > 0) {
      const users: IUser[] = userList.filter((user: IUser) => message.userId === user.id);
      if (users.length > 0) {
        return users[0];
      }
      return {
        createdAt: "",
        updatedAt: "",
        id: "",
        name: "EMPTY - NO USER",
        avatarURL: ""
      };
    }
  }
  function GetMessageUsername(message: IMessage): string {
    const user = GetUserFromMessage(message);
    if (user) return user.name;
    return "[ERROR] USER NOT FOUND";
  }

  return (
    <>
      {messageList
        ? messageList!.map((message) => {
            return (
              <UserMessage
                key={message.id}
                username={GetMessageUsername(message)}
                avatarURL={GetUserFromMessage(message)?.avatarURL}
                timeStamp={new Date().toISOString().substring(0, 10)}
              >
                {message.content}
              </UserMessage>
            );
          })
        : ""}
    </>
  );
}

export default ChatList;
