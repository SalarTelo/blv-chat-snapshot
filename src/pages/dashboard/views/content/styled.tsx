import styled from "styled-components";
import { colors, gap } from "../../../../theme/variables";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;
export const Content = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export const ChatContent = styled.div`
  flex: 1;
  display: flex;
  padding: ${gap.large} ${gap.small} 0 ${gap.small};
  position: relative;
`;
export const MessageWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
`;

export const MessageScroller = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: absolute;
  flex: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
`;

export const InputForm = styled.form`
  border-top-style: solid;
  border-width: 2px;
  border-color: ${colors.lightGray};
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;
