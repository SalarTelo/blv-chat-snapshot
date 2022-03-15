import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
import SidebarTab from "./tab-template";
import { colors, font, gap, radius, shadow } from "../../../../../theme/variables";
import { DownloadIcon, MediaIcon } from "../../../../../components/icons";
import { useAppSelector } from "../../../../../redux/hooks";
import { IFile } from "../../../../../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.medium};
  width: 100%;
  height: 100%;
`;
const FileContainer = styled.div`
  width: 300px;
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
const DownloadContainer = styled.a`
  text-decoration: none;
`;
function FormatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
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
          <div style={style.title}>{data.name}</div>
          <div style={style.subtitle}>{FormatBytes(data.size * 1000, 2)}</div>
        </FileInfo>
        <DownloadIcon height={15} width={15} color={colors.gray} />
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
    <SidebarTab title="Files" subTitle={`${fileList.length} files`}>
      <Container>
        {fileList.map((file: IFile) => {
          return (
            <DownloadContainer
              key={file.id}
              href={file.url}
              rel="noreferrer noopener"
              target="_blank"
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
