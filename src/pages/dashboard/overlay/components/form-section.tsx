import React from "react";
import { Section } from "../styled";
import { BoldDG, FontSizes } from "../../../../components/Text";
import { gap } from "../../../../theme/variables";

export default function FormSection({
  children,
  title
}: React.PropsWithChildren<{ title?: string }>) {
  return (
    <Section>
      {title ? <BoldDG fontSize={FontSizes.medium}>{title}</BoldDG> : ""}
      <div style={{ display: "flex", flexDirection: "row", gap: gap.medium }}>{children}</div>
    </Section>
  );
}
