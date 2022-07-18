import React, { useState } from "react";
import styled from "styled-components";
import { colors, gap, radius, shadow } from "../../../theme/variables";
import { BoldDG, FontSizes, RegularDG, RegularG } from "../../../components/Text";
import { TextareaForm } from "./styled";
import { BasicButton } from "../../../components/buttons";
import RoundCube from "../../../components/RoundCube";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(10px);
  z-index: 9999;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${gap.medium};
  background-color: ${colors.lightGray};
  box-shadow: ${shadow.defaultBox};
  border-radius: ${radius.medium};
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.13);

  gap: ${gap.medium};
`;
const CancelButton = styled.button`
  position: absolute;
  right: 0;
  border-style: none;
  outline-style: none;
  background-color: transparent;
  top: 3px;
  cursor: pointer;

  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.4;
  }
`;

function MilestoneFinishForm({
  onCancel,
  onSubmit
}: {
  onCancel: () => void;
  onSubmit: (summary: string) => void;
}) {
  const [summaryText, setSummaryText] = useState<string>("");
  return (
    <Wrapper>
      <Container>
        <CancelButton onClick={onCancel}>
          <RoundCube size={25} roundness={40} />
        </CancelButton>
        <div>
          <BoldDG fontSize={FontSizes.large}>Milestone Summary</BoldDG>
          <RegularG fontSize={FontSizes.medium}>
            Summarise what has happened in this milestone
          </RegularG>
        </div>
        <TextareaForm
          placeholder="Write here..."
          value={summaryText}
          onChange={(event) => setSummaryText(event.target.value)}
          style={{ width: "400px", height: "200px" }}
        />
        <BasicButton onClick={() => onSubmit(summaryText)}>
          <RegularDG fontSize={FontSizes.medium}>Mark as done</RegularDG>
        </BasicButton>
      </Container>
    </Wrapper>
  );
}

export default MilestoneFinishForm;
