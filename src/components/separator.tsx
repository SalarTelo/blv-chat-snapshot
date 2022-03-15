import styled from "styled-components";
import { gap, colors } from "../theme/variables";

type baseProp = {
  color?: String;
  length?: number;
};

export const VerticalSeparator = styled.div<baseProp>`
  height: ${(props) => (props.length ? props.length : gap.small)}px;
  width: 1px;
  border-radius: 99px;
  background-color: ${(props) => (props.color ? props.color : "#000")};
`;

export const HorizontalSeparator = styled.div<baseProp>`
  width: ${(props) => (props.length ? props.length : gap.small)}px;
  height: 1px;
  border-radius: 99px;
  background-color: ${(props) => (props.color ? props.color : colors.gray)};
`;
