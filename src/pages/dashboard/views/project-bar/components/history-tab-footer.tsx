import React from "react";
import styled from "styled-components";
import { colors, font, gap } from "../../../../../theme/variables";
import { BellIcon } from "../../../../../components/icons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../../components/separator";
import { BasicButton } from "../../../../../components/buttons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${gap.small};
`;
const RequestButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${gap.small};
  color: ${colors.darkGray};
  font-size: ${font.size.large};
  cursor: pointer;
  user-select: none;
  padding: ${gap.small} 0;
  font-weight: ${font.weight.thin};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
export default function HistoryTabFooter({ onRequestRes }: { onRequestRes: () => void }) {
  return (
    <Container>
      <RequestButton onClick={() => onRequestRes()}>
        <BellIcon width={32} height={32} />
        <VerticalSeparator length={16} color={colors.gray} />
        Request Response
      </RequestButton>
      <HorizontalSeparator length={200} color={colors.gray} />
      <BasicButton
        color={colors.darkGray}
        fitContent
        style={{
          fontSize: font.size.large,
          padding: `${gap.medium} ${gap.large}`,
          fontWeight: font.weight.thin
        }}
      >
        Send ÄTA invoice
      </BasicButton>
    </Container>
  );
}
