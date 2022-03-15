import React, { useState } from "react";
import { InputContainer, InputText } from "../styled";
import { FontSizes, RegularDG } from "../../../../components/Text";
import { colors } from "../../../../theme/variables";

// TODO: Move this to a more generic area to make it obvious that this could be used elsewhere
export default function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label: string }) {
  const [value, setValue] = useState<string>("");

  return (
    <InputContainer>
      <RegularDG fontSize={FontSizes.small}>{label}</RegularDG>
      <InputText
        {...props}
        style={{ borderColor: value !== "" ? colors.blue : "" }}
        onKeyUp={(event) => setValue(event.currentTarget?.value)}
      />
    </InputContainer>
  );
}
