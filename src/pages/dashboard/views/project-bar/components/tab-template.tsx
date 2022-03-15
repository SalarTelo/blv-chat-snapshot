import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { colors, font, gap, radius, shadow } from "../../../../../theme/variables";

const TabContainer = styled.div`
  padding: ${gap.medium};
  font-weight: ${font.weight.semiBold};
  color: ${colors.darkGray};
  font-size: ${font.size.large};
  border-radius: ${radius.small};
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  user-select: none;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${gap.medium};
`;

const HeaderTitle = styled.div`
  font-size: ${font.size.xxLarge};
  color: ${colors.darkGray};
`;
const HeaderSub = styled.div`
  font-size: ${font.size.large};
  color: ${colors.gray};
`;

const Content = styled.div`
  overflow: auto;
  flex: 1;
`;
const Footer = styled.div`
  width: 100%;
  padding: ${gap.small} 0 0;
`;

type props = React.PropsWithChildren<{
  title?: string;
  subTitle?: string;
  footer?: React.ReactNode;
}>;

export default function SidebarTab({ title, subTitle, children, footer }: props) {
  return (
    <TabContainer>
      {title ? (
        <Header>
          <HeaderTitle>{title}</HeaderTitle>
          {subTitle ? <HeaderSub>{subTitle}</HeaderSub> : ""}
        </Header>
      ) : (
        ""
      )}
      <Content>{children}</Content>
      {footer ? <Footer>{footer}</Footer> : ""}
    </TabContainer>
  );
}
