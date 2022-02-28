import styled from "styled-components";
import { colors, font, gap, radius, shadow } from "../../../../theme/variables";

export const Container = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  user-select: none;
  padding: ${gap.medium};
  gap: ${gap.small};
  background-color: ${colors.lightGray};
`;

export const UserTitle = styled.header`
  padding: ${gap.medium} 0;
  text-align: center;
`;
export const CompanyList = styled.div`
  flex: 1 1 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: ${gap.small};
`;
export const FooterButton = styled.div`
  width: 100%;
  padding: ${gap.medium} 0;
  background-color: ${colors.white};

  color: ${colors.darkGray};
  font-size: ${font.size.large};
  font-weight: ${font.weight.thin};
  box-shadow: ${shadow.defaultBox};
  border-radius: ${radius.small};
  user-select: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${gap.small};
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
`;
export const FilterRow = styled.div`
  display: flex;
  gap: ${gap.small};
`;

export const PropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: ${gap.small};
`;
