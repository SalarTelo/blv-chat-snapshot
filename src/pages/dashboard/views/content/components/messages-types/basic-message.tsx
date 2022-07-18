import React from "react";
import styled from "styled-components";
import validator from "validator";
import { IFile, IMessage } from "../../../../../../types/types";
import { colors, font, gap, radius } from "../../../../../../theme/variables";
import { DownloadIcon } from "../../../../../../components/icons";
import { FontSizes, RegularDG } from "../../../../../../components/Text";
import isURL = validator.isURL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.small};
`;
const FileListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${gap.small};
`;
const FileItem = styled.a`
  height: fit-content;
  padding: ${gap.small};
  background-color: ${colors.lightGray};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${gap.small};
  border-radius: ${radius.medium};
  border-style: solid;
  border-width: 1px;
  border-color: rgba(110, 188, 223, 0.22);

  cursor: pointer;
  user-select: none;

  &:hover {
    border-color: ${colors.blue};
  }
  &:active {
    opacity: 0.7;
  }
`;
const ImagePreviewer = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: ${radius.small};
  border-style: none;
  outline-style: none;
`;
const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.small};
`;
const FileTitle = styled.div`
  color: ${colors.blue};
  flex: 1;
  font-weight: ${font.weight.semiBold};
  font-size: ${font.size.medium};
`;
const URLLink = styled.a`
  font-weight: ${font.weight.semiBold};
  text-decoration: none;

  color: ${colors.darkBlue};
  &:hover {
    color: ${colors.blue};
  }
`;
const doesURLGoToImage = (url: string) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;
const FormatLink = (link: string): string => {
  if (!isURL(link)) return "https://localhost:3000";
  if (link.indexOf("http://") === 0 || link.indexOf("https://") === 0) {
    return link;
  }
  return `https://${link}`;
};

function BasicMessage({ messageData }: { messageData: IMessage }) {
  return (
    <Container>
      {messageData.content !== "" ? (
        validator.isURL(messageData.content) ? (
          <URLLink href={FormatLink(messageData.content)} rel="noreferrer noopener" target="_blank">
            {messageData.content}
          </URLLink>
        ) : (
          <RegularDG fontSize={FontSizes.medium}>{messageData.content}</RegularDG>
        )
      ) : (
        ""
      )}

      {messageData.files.length > 0 ? (
        <FileListContainer>
          {messageData.files.map((file: IFile) => (
            <FileWrapper key={file.id}>
              {doesURLGoToImage(file.url) ? (
                <ImagePreviewer src={file.url}>
                </ImagePreviewer>
              ) : ""}
              <FileItem href={FormatLink(file.url)} rel="noreferrer noopener" target="_blank">
                <FileTitle>
                  {file.name.length > 25 ? `${file.name.substring(0, 26)}...` : file.name}
                </FileTitle>
                <DownloadIcon color={colors.gray} />
              </FileItem>
            </FileWrapper>
          ))}
        </FileListContainer>
      ) : (
        ""
      )}
    </Container>
  );
}

export default BasicMessage;
