import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import styled from "styled-components";
import { colors, gap, radius, shadow } from "../theme/variables";
import { FontSizes, RegularDG, RegularG } from "./Text";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${gap.small};
  cursor: pointer;
  user-select: none;
  padding: ${gap.xSmall};
`;
const CheckboxContainer = styled.div``;
const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${radius.small};
  border-width: 2px;
  border-style: solid;
  background-color: white;
  width: 20px;
  height: 20px;
`;
const Inner = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${colors.blue};
`;

type props = {
  onToggle?: (name: string, state: boolean) => void;
  label?: string;
  name: string;
};
export default function Checkbox({ onToggle, label, name }: props) {
  const [isChecked, setChecked] = useState<boolean>(false);
  const toggleState = () => {
    setChecked((prevState) => !prevState);
  };
  const style = {
    Container: {
      borderColor: isChecked ? colors.blue : colors.gray
    }
  };
  useEffect(() => {
    if (onToggle) onToggle(name, isChecked);
  }, [isChecked]);

  return (
    <Container onClick={() => toggleState()}>
      <CheckboxContainer>
        <Outer style={style.Container}>
          <Inner style={{ display: isChecked ? "" : "none" }} />
        </Outer>
      </CheckboxContainer>
      <RegularDG color={colors.lightGray} fontSize={FontSizes.medium}>
        {label}
      </RegularDG>
    </Container>
  );
}
