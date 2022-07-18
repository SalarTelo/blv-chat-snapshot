import styled from "styled-components";
import { colors, font, gap } from "../../../../theme/variables";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1px;
`;

export const SidebarButton = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: ${font.size.small};
  font-weight: ${font.weight.thin};
  color: ${colors.darkGray};
  gap: 8px;
  padding: ${gap.medium};

  &:hover {
    opacity: 30%;
  }
`;
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  align-items: center;
`;
export const TabContainer = styled.div`
  background-color: ${colors.lightGray};
  height: 100%;
  padding: ${gap.small} ${gap.medium};
`;
