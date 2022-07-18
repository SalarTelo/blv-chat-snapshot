import React from "react";
import { IMessage, IUser } from "../../../../../types/types";
import { UserMessage, AppendedMessage } from "./chat-message";
import { MessageScroller, MessageWrapper } from "../styled";

type props = {
  messages: IMessage[];
  users: IUser[];
};

export default function ChatList({ users, messages }: props) {
  function GetAuthor(message: IMessage): IUser {
    if (users.length > 0) {
      const list: IUser[] = users.filter((user: IUser) => message.userId === user.id);
      if (list.length > 0) {
        return list[0];
      }
    }
    return {
      username: "",
      createdAt: "",
      updatedAt: "",
      id: "",
      displayName: "UNKNOWN USER",
      avatarURL: ""
    };
  }

  return (
    <MessageWrapper>
      <MessageScroller>
        {messages.map((message: IMessage, index: number, array: IMessage[]) => {
          if (index === 0 || message.userId !== array[index - 1].userId) {
            return (
              <UserMessage messageData={message} authorData={GetAuthor(message)} key={message.id} />
            );
          }
          return (
            <AppendedMessage
              key={message.id}
              messageData={message}
              authorData={GetAuthor(message)}
            />
          );
        })}
      </MessageScroller>
    </MessageWrapper>
  );
}
