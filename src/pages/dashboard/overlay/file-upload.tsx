import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import * as S3 from "../../../utils/aws";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ADD_FILE, ADD_MESSAGE, SET_OVERLAY_STATE } from "../../../redux/action-types";
import { BoldDG, BoldG, FontSizes } from "../../../components/Text";
import { colors, font, gap, radius, shadow } from "../../../theme/variables";
import { DownloadIcon, TrashcanIcon } from "../../../components/icons";
import { BasicButton } from "../../../components/buttons";
import FileItem from "./components/file-item";
import { IFile, IMessage } from "../../../types/types";
import { AddFileToProject, SendMessage } from "../../../utils/api";
import SOCKET from "../../../utils/socketIO";

const Wrapper = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  margin-bottom: 200px;
  z-index: 9999;
`;
const Container = styled.div`
  position: relative;
`;
const UploadOverlay = styled.div`
  background-color: ${colors.white};
  box-shadow: ${shadow.defaultBox};
  border-radius: ${radius.xLarge};
  padding: ${gap.small};
`;
const OverlayMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${gap.medium};
  width: 100%;
  opacity: 0.4;
`;
const Separator = styled.div`
  height: 3px;
  width: 20%;
  border-radius: 9999px;
  background-color: ${colors.gray};
`;
const OverlayForeground = styled.div`
  padding: 40px 60px;

  display: flex;
  flex-direction: column;
  gap: ${gap.medium};
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray};
  border-radius: ${radius.large};
`;
const FileListWrapper = styled.div`
  top: 105%;
  left: 0;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${gap.small};
`;
const FileList = styled.div`
  bottom: -60px;
  left: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  max-height: 320px;
  gap: ${gap.small};
  overflow: auto;
  padding: 5px;
`;
const FileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: space-between;
`;
const FileOption = styled.div`
  cursor: pointer;
  border-radius: 0 ${radius.medium} ${radius.medium} 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  background-color: ${colors.darkGray};
  opacity: 0.7;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.9;
    width: 70px;
  }
  &:active {
    opacity: 1;
  }
`;

interface FileData {
  file: File;
  progress: number;
}
export default function UploadFileOverlay() {
  const [fileList, setFileList] = useState<FileData[]>([]);
  const [hasInitialized, setInit] = useState<boolean>(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);
  const addFiles = (data: File[]) => {
    const list: FileData[] = [];
    for (let i = 0; i < data.length; i++) {
      fileList.push({
        file: data[i],
        progress: 0
      });
    }
    setFileList((prevState) => [...prevState, ...list]);
  };
  const closeOverlay = () => {
    dispatch({
      type: SET_OVERLAY_STATE,
      payload: 0
    });
  };
  const handleRemoveFile = (fileToRemove: File) => {
    setFileList((prevState) => prevState.filter(({ file }) => file.name !== fileToRemove.name));
    if (fileList.length === 1) {
      closeOverlay();
    }
  };
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      // TODO: do some validation. Check if file is already in list. Check if file is the correct format.
      addFiles(event.dataTransfer.files);
      setInit(true);
    } else {
      closeOverlay();
    }
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (fileList.length === 0) {
      closeOverlay();
    }
  };
  const handleBrowseFile = (event: ChangeEvent<HTMLDivElement>) => {
    if (event.target.files.length > 0) {
      const list: FileData[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        list.push({
          file: event.target.files[i],
          progress: 0
        });
      }
      setFileList((prevState) => [...prevState, ...list]);
    }
  };

  const uploadAllFiles = () => {
    for (let i = 0; i < fileList.length; i++) {
      S3.uploadFile({
        // Every update
        async onUploadProgress(event) {
          // Get progress of upload
          const percentage: number = Math.round((event.loaded / event.total) * 100);
          setFileList((files: FileData[]) => {
            return files.map((data: FileData) => {
              if (data.file.name === fileList[i].file.name)
                return {
                  file: data.file,
                  progress: percentage
                };
              return data;
            });
          });
          fileList[i].progress = percentage;
        },

        // Once when the upload is done
        async onFinishUpload() {
          const fileData: IFile = {
            createdAt: DateTime.now().toJSDate().toISOString(),
            id: uuidv4(),
            projectId: selector.selectedProjectId,
            senderId: selector.userData.id,
            updatedAt: "",
            name: fileList[i].file.name,
            size: Math.round(fileList[i].file.size / 1000),
            url: `https://lorantest.s3.eu-north-1.amazonaws.com/images/${fileList[i].file.name}`
          };
          // TODO: Rename the filename to a random string of characters so we never get duplicates

          const messageData: IMessage = {
            createdAt: DateTime.now().toJSDate().toISOString(),
            id: uuidv4(),
            updatedAt: "",
            user: selector.userData,
            content: "",
            files: [fileData],
            projectId: selector.selectedProjectId,
            type: 0,
            userId: selector.userData.id
          };
          dispatch({
            type: ADD_FILE,
            payload: fileData
          });
          dispatch({
            type: ADD_MESSAGE,
            payload: messageData
          });
          SOCKET.SendMessage(messageData);
          await AddFileToProject(fileData);
          await SendMessage(messageData);
          setTimeout(
            () =>
              setFileList((prevState) =>
                prevState.filter((data: FileData) => data.progress !== 100)
              ),
            400
          );
        },

        file: fileList[i].file
      });
    }
  };

  useEffect(() => {
    if (fileList.length === 0 && hasInitialized) {
      closeOverlay();
    }
  }, [fileList]);

  return (
    <Wrapper onDragOver={handleDragOver} onDrop={handleDrop} onDragLeave={handleLeave}>
      <Container>
        <UploadOverlay>
          <OverlayForeground>
            <DownloadIcon color={colors.blue} width={56} height={56} />
            <BoldG fontSize={FontSizes.xxLarge}>Drop a file to upload...</BoldG>
            <OverlayMiddle>
              <Separator />
              <BoldG fontSize={FontSizes.xLarge}>Or</BoldG>
              <Separator />
            </OverlayMiddle>
            <BasicButton
              color={colors.blue}
              style={{ fontSize: font.size.large, padding: `${gap.medium} ${gap.large} ` }}
              onClick={() => {
                if (inputRef) {
                  inputRef.current.click();
                }
              }}
            >
              <input
                type="file"
                id="file"
                onChange={handleBrowseFile}
                style={{ display: "none" }}
                ref={inputRef}
              />
              Browse Files
            </BasicButton>
          </OverlayForeground>
        </UploadOverlay>
        {fileList.length > 0 ? (
          <FileListWrapper>
            <FileList>
              {fileList.map(({ file, progress }) => (
                <FileWrapper key={`${file.size}-${file.lastModified}`}>
                  <FileItem data={file} />
                  <FileOption onClick={() => handleRemoveFile(file)}>
                    <TrashcanIcon color={colors.white} />
                  </FileOption>
                  {progress === 0 ? (
                    ""
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        marginLeft: 10,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <BoldDG fontSize={FontSizes.medium}>{progress}%</BoldDG>
                    </div>
                  )}
                </FileWrapper>
              ))}
            </FileList>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: gap.small }}>
              <BasicButton
                style={{ fontSize: font.size.medium }}
                fitContent
                onClick={() => {
                  if (fileList.length > 0) uploadAllFiles();
                }}
                color={colors.white}
                backgroundColor={colors.darkGray}
              >
                Upload
              </BasicButton>
              <BasicButton
                style={{ fontSize: font.size.medium, padding: "15px 25px" }}
                color={colors.white}
                onClick={closeOverlay}
                backgroundColor={colors.red}
              >
                Cancel
              </BasicButton>
            </div>
          </FileListWrapper>
        ) : (
          ""
        )}
      </Container>
    </Wrapper>
  );
}
