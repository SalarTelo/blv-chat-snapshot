import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarTab from "./tab-template";
import { colors, font, gap, radius, shadow } from "../../../../../theme/variables";
import { DownloadIcon, MediaIcon } from "../../../../../components/icons";
import { useAppSelector } from "../../../../../redux/hooks";
import { IFile } from "../../../../../types/types";
import { FormatBytes } from "../../../../../utils/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.medium};
  width: 100%;
  height: 100%;
`;
const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
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
  border-radius: ${radius.medium};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${shadow.defaultBox};
`;
const FileInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DownloadContainer = styled.a`
  text-decoration: none;
`;

function FileItem({ data }: { data: IFile }) {
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
          <div style={style.title}>
            {data.name.length > 26 ? `${data.name.substring(0, 25)}...` : data.name}
          </div>
          <div style={style.subtitle}>{FormatBytes(data.size * 1000, 2)}</div>
        </FileInfo>
        <div>
          <DownloadIcon height={15} width={15} color={colors.gray} />
        </div>
      </CardRight>
    </FileContainer>
  );
}

function FileTab() {
  const [fileList, setFileList] = useState<IFile[]>([]);
  const selector = useAppSelector((state) => state.app);
  useEffect(() => {
    const list: IFile[] = selector.files.filter(
      (file: IFile) => file.projectId === selector.selectedProjectId
    );
    const sortedList = list.sort((first: IFile, second: IFile) =>
      first.createdAt < second.createdAt ? -1 : 0
    );
    setFileList(sortedList);
  }, [selector.selectedProjectId, selector.files]);

  return (
    <SidebarTab width="100%" title="Files" subTitle={`${fileList.length} files`}>
      <Container>
        {fileList.map((file: IFile) => {
          return (
            <DownloadContainer
              key={file.id}
              href={file.url}
              rel="noreferrer noopener"
              target="_blank"
              download
              role="button"
            >
              <FileItem data={file} />
            </DownloadContainer>
          );
        })}
      </Container>
    </SidebarTab>
  );
}

export default FileTab;
