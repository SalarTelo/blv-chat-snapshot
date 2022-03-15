import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { DateTime } from "luxon";
import { font, gap } from "../../../../../theme/variables";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { ADD_MESSAGE } from "../../../../../redux/action-types";
import { IMessage } from "../../../../../types/types";
import { SendMessage } from "../../../../../utils/api";

export default function ChatInputArea() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);
  const handleInput = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const content: string = (e.target.value).trim();
      const messageData: IMessage = {
        content,
        createdAt: "",
        id: "",
        projectId: selector.selectedProjectId,
        updatedAt: "",
        user: selector.userData,
        userId: selector.userData.id
      };
      const data: IMessage = await SendMessage(messageData, selector.selectedProjectId, selector.userData);
      console.log(data);
      dispatch({
        type: ADD_MESSAGE,
        payload: data.data.record
      });
      // WHY DOES THIS MAKE THE TEXTAREA ADD NEWLINE BEFORE CLEARING?????
      e.target.value = "";
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
  return (
    <TextareaAutosize
      style={style}
      placeholder="Write here..."
      onKeyUp={handleInput}
    />
  );
}
