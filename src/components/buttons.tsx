import styled from "styled-components";
import React from "react";
import { font, colors, gap, radius, shadow } from "../theme/variables";
import {
  PlusIcon,
  BellIcon,
  HomeIcon,
  FolderIcon,
  AddFolderIcon,
  DownloadIcon,
  MediaIcon,
  TrashcanIcon,
  FilterIcon,
  HistoryIcon
} from "./icons";

const DEFAULT_BUTTON_ANIMATION_TIME = 0.01; // in s not ms

export const BasicButton = styled.button<{
  backgroundColor?: string;
  color?: string;
  fitContent?: boolean;
}>`
  padding: ${gap.small} ${gap.medium};
  background-color: ${({ backgroundColor }) => {
    return backgroundColor || colors.white;
  }};
  box-shadow: ${shadow.defaultBox};
  color: ${({ color }) => {
    return color || colors.gray;
  }};
  border-radius: ${radius.small};
  font-size: ${font.size.small};
  font-weight: ${font.weight.semiBold};
  user-select: none;
  border-style: none;
  cursor: pointer;
  width: ${({ fitContent }) => (fitContent ? "100%" : "auto")};
  display: flex;
  margin: 0;
  gap: ${gap.small};
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;

const DEFAULT_ICON_COLOR = colors.gray;
const DEFAULT_ICON_WIDTH = 16;
const DEFAULT_ICON_HEIGHT = 16;
type IconProp = {
  width?: number;
  height?: number;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const IconButton = styled.div`
  opacity: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${DEFAULT_BUTTON_ANIMATION_TIME}s;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.4;
  }
`;
export function PlusButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <PlusIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function BellButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <BellIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function HomeButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <HomeIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function FilterButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <FilterIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function FolderButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <FolderIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function HistoryButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <HistoryIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function MediaButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <MediaIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function TrashcanButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <TrashcanIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function AddFolderButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <AddFolderIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
export function DownloadButton({ onClick, height, width, color }: IconProp) {
  return (
    <IconButton onClick={onClick}>
      <DownloadIcon
        height={height ?? DEFAULT_ICON_HEIGHT}
        width={width ?? DEFAULT_ICON_WIDTH}
        color={color ?? DEFAULT_ICON_COLOR}
      />
    </IconButton>
  );
}
