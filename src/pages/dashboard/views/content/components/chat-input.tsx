import React, { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { DateTime } from "luxon";
import {v4 as uuidv4} from "uuid";
import { font, gap } from "../../../../../theme/variables";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { ADD_MESSAGE } from "../../../../../redux/action-types";
import { IMessage } from "../../../../../types/types";
import { SendMessage } from "../../../../../utils/api";
import socketIO from "../../../../../utils/socketIO";

export default function ChatInputArea() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);

  const handleInput = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const content: string = e.target.value.trim();
      if (content !== "") {
        const messageData: IMessage = {
          content,
          createdAt: DateTime.now().toJSDate().toISOString(),
          files: [],
          id: uuidv4(),
          type: 0,
          updatedAt: "",
          user: selector.userData,
          projectId: selector.selectedProjectId,
          userId: selector.userData.id
        };
        dispatch({
          type: ADD_MESSAGE,
          payload: messageData
        });
        e.target.value = "";

        socketIO.SendMessage(messageData);
        await SendMessage(messageData);
      }
    }
  };
  const style = {
    width: "100%",
    height: "100%",
    borderStyle: "none",
    resize: "none",
    fontWeight: 300,
    fontFamily: "open sans",
    fontSize: font.size.medium,
    padding: gap.small,
    outlineStyle: "none"
  };
  return <TextareaAutosize style={style} placeholder="Write here..." onKeyUp={handleInput} />;
}
