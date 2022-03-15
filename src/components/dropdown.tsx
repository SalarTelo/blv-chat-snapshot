import React, { useState } from "react";
import styled from "styled-components";
import { colors, gap, radius, shadow } from "../theme/variables";
import { BoldDG, FontSizes } from "./Text";
import { ArrowIcon } from "./icons";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: ${gap.small};
  flex-direction: column;
  user-select: none;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${gap.small};
  justify-content: center;
  align-items: center;
  padding: 14px ${gap.medium};
  box-shadow: ${shadow.defaultBox};
  background-color: ${colors.white};
  border-radius: ${radius.normal};

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  }
`;
const List = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-width: 100%;
  padding: ${gap.small} ${gap.medium};
  box-shadow: ${shadow.defaultBox};
  background-color: ${colors.white};
  border-radius: ${radius.normal};
  top: 55px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  white-space: nowrap;
  padding: ${gap.medium};
  opacity: 0.6;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    opacity: 0.4;
  }
`;
type prop = {
  items: string[];
  onSelect?: (index: number) => void;
};
export default function DropDown({ items, onSelect }: prop) {
  const [selectedIndex, setIndex] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleSelect = (value: string) => {
    if (items.length === 0) return;

    const index = items.findIndex((name: string) => name === value);
    setIndex(index);
    if (onSelect) {
      onSelect(index);
    }
    setOpen(false);
  };
  const handleToggle = () => {
    if (items.length === 0) return;

    setOpen((prevState) => !prevState);
  };
  return (
    <Container>
      <Header onClick={() => handleToggle()}>
        {items.length > 0 ? (
          <>
            <BoldDG fontSize={FontSizes.large}>{items[selectedIndex]}</BoldDG>
            <ArrowIcon
              color={isOpen ? colors.darkGray : colors.gray}
              style={{ transform: isOpen ? "" : "RotateZ(180deg)" }}
              height={8}
              width={8}
            />
          </>
        ) : (
          <BoldDG fontSize={FontSizes.large}>EMPTY</BoldDG>
        )}
      </Header>
      {isOpen && items.length > 0 ? (
        <List>
          {items
            .filter((item: string) => item !== items[selectedIndex])
            .map((name) => {
              return (
                <Item key={name} onClick={() => handleSelect(name)}>
                  <BoldDG fontSize={FontSizes.medium}>{name}</BoldDG>
                </Item>
              );
            })}
        </List>
      ) : (
        ""
      )}
    </Container>
  );
}
