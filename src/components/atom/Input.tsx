import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { colors, font, gap, radius } from "../../theme/variables";

type DefaultInputProp = {
  isRequired?: boolean;
  placeholder?: string;
};

const BaseInput = styled.input`
  font-size: ${font.size.medium};
  outline-style: none;
  border-style: none;
  width: 100%;
  color: ${colors.darkGray};
  &::placeholder {
    color: ${colors.gray};
  }
`;

export function SkinnedInput({ isRequired = false, placeholder }: DefaultInputProp) {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(event.currentTarget.value === "");
  };
  const style = {
    container: {
      display: "flex",
      position: "relative",
      width: "100%"
    },
    label: {
      color: colors.gray,
      fontSize: font.size.small,
      display: "flex",
      height: "100%",
      marginRight: gap.small,
      justifyContent: "flex-end",
      alignItems: "center"
    }
  };
  return (
    <div style={style.container}>
      {isRequired && isEmpty ? (
        <div style={{ width: "100%", height: "100%", position: "absolute", pointerEvents: "none" }}>
          <div style={style.label}>(required)</div>
        </div>
      ) : (
        ""
      )}

      <BaseInput placeholder={placeholder} onChange={handleOnChange} />
    </div>
  );
}
export function UnderLineInput(props: DefaultInputProp) {
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    underline: {
      height: "2px",
      width: "100%",
      borderRadius: radius.small,
      backgroundColor: colors.lightGray
    }
  };
  return (
    <div style={style.container}>
      <SkinnedInput {...props} />
      <div style={style.underline} />
    </div>
  );
}
