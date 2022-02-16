import React from "react";
import styled from "styled-components";
import { font, colors } from "../../theme/variables";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  font-size: ${font.size.large};
  color: ${colors.darkGray};
  font-weight: ${font.weight.semiBold};
  display: flex;
  flex-direction: row;
`;
const Sub = styled.div`
  font-size: ${font.size.small};
  font-weight: ${font.weight.thin};
  color: ${colors.gray};
`;

type props = {
  HeaderText: React.ReactNode;
  SubText: React.ReactNode;
};
export default function HeaderNsub({ HeaderText, SubText }: props) {
  return (
    <Container>
      <Header>{HeaderText}</Header>
      <Sub>{SubText}</Sub>
    </Container>
  );
}
