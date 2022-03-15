import React from "react";
import styled from "styled-components";
import { HorizontalSeparator, VerticalSeparator } from "./separator";
import { gap } from "../theme/variables";

export enum IconAlignment {
  Vertical,
  Horizontal
}
const GetAlignment = (alignment: IconAlignment) => {
  switch (alignment) {
    case IconAlignment.Vertical:
      return "column";
    case IconAlignment.Horizontal:
      return "row";
    default:
      return "column";
  }
};

type props = React.PropsWithChildren<{
  icon: React.ReactNode;
  iconAlignment: IconAlignment;
}>;
const Container = styled.div<{ iconAlignment: IconAlignment }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${gap.small};
  flex-direction: ${({ iconAlignment }) => (iconAlignment ? GetAlignment(iconAlignment) : "row")};
`;
export function IconText({ icon, iconAlignment, children }: props) {
  return (
    <Container iconAlignment={iconAlignment}>
      {icon}
      {iconAlignment === IconAlignment.Horizontal ? <HorizontalSeparator length={16} /> : ""}
      {iconAlignment === IconAlignment.Vertical ? <VerticalSeparator length={16} /> : ""}
      {children}
    </Container>
  );
}
