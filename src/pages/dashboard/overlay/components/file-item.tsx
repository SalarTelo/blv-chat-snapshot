import React from "react";
import styled from "styled-components";
import { BoldDG, FontSizes, RegularDG } from "../../../../components/Text";
import { colors, gap, radius } from "../../../../theme/variables";
import { FormatBytes } from "../../../../utils/utils";

const FileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  padding: ${gap.medium};
  background-color: ${colors.white};
  border-radius: ${radius.medium} 0 0 ${radius.medium};
`;
type props = {
  data: File;
};
export default function FileItem({ data }: props) {
  return (
    <FileContainer>
      <BoldDG fontSize={FontSizes.medium} style={{ color: colors.blue }}>
        {data.name}
      </BoldDG>
      <RegularDG fontSize={FontSizes.small}>{FormatBytes(data.size)}</RegularDG>
    </FileContainer>
  );
}
