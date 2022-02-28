import React from "react";
import styled from "styled-components";
import SidebarTab from "./TabTemplate";
import { colors, font, gap, radius, shadow } from "../../../../theme/variables";
import { DownloadIcon, MediaIcon } from "../../../../components/atom/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.medium};
  width: 100%;
  height: 100%;
`;
const FileContainer = styled.div`
  width: 240px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${gap.medium};
  justify-content: flex-start;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
const CardRight = styled.div`
  background-color: ${colors.white};
  padding: ${gap.small} ${gap.medium};
  border-radius: ${radius.normal};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${shadow.defaultBox};
`;
const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
type CardProp = {
  title: string;
  subtitle: string;
};
function FileItem({ title, subtitle }: CardProp) {
  const style = {
    title: {
      fontSize: font.size.medium,
      color: colors.blue,
      fontWeight: font.weight.normal
    },
    subtitle: {
      fontSize: font.size.small,
      color: colors.gray,
      fontWeight: font.weight.normal
    }
  };
  return (
    <FileContainer>
      <div style={{ width: "32px" }}>
        <MediaIcon width={32} height={32} color={colors.darkGray} />
      </div>
      <CardRight>
        <FileInfo>
          <div style={style.title}>{title}</div>
          <div style={style.subtitle}>{subtitle}</div>
        </FileInfo>
        <DownloadIcon height={15} width={15} color={colors.gray} />
      </CardRight>
    </FileContainer>
  );
}
function FileTab() {
  return (
    <SidebarTab title="Files" subTitle="4 files">
      <Container>
        <FileItem title="File1.jpg" subtitle="1MB" />
        <FileItem title="File2.png" subtitle="14MB" />
        <FileItem title="File3.pdf" subtitle="3MB" />
        <FileItem title="File4.pdf" subtitle="4MB" />
      </Container>
    </SidebarTab>
  );
}

export default FileTab;
