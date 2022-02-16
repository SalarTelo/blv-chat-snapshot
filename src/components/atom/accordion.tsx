import React, { useState } from "react";
import styled from "styled-components";
import { colors, gap, radius, shadow } from "../../theme/variables";
import { ArrowIcon } from "./icons";

const Container = styled.div`
  
`;
const HeaderContent = styled.div`
  user-select: none;
  cursor: pointer;
  padding: ${gap.medium};
  border-radius: ${radius.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type props = React.PropsWithChildren<{
  onToggle?: (newState: boolean) => void | null;
  onClose?: () => void | null;
  onOpen?: () => void | null;
  headerContent: React.ReactNode;
}>;

function Accordion({ children, onClose, onOpen, onToggle, headerContent }: props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ArrowStyle = {
    transform: isOpen ? "rotate(0deg)" : "rotate(180deg)"
  };
  const containerStyle = {
    backgroundColor: isOpen ? colors.white : "transparent",
    boxShadow: isOpen ? shadow.defaultBox : ""
  };

  return (
    <Container>
      <HeaderContent
        style={containerStyle}
        onClick={() =>
          setIsOpen((currentSate: boolean) => {
            if (currentSate) onClose?.();
            else onOpen?.();
            onToggle?.(!currentSate);
            return !currentSate;
          })
        }>
        {headerContent}
        <ArrowIcon
          height={10}
          width={10}
          color={isOpen ? colors.darkGray : colors.gray}
          style={ArrowStyle}
        />
      </HeaderContent>

      {isOpen ? <div>{children}</div> : ""}
    </Container>
  );
}

export default Accordion;
