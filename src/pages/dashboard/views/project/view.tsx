import React, { useState } from "react";
import styled from "styled-components";
import { colors, font, gap } from "../../../../theme/variables";
import { DownloadIcon, HistoryIcon } from "../../../../components/atom/icons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../components/atom/separator";
import HistoryTab from "./HistoryTab";
import FileTab from "./FileTab";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SidebarButton = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font: ${font.size.small};
  font-weight: ${font.weight.thin};
  color: ${colors.darkGray};
  gap: 8px;
  padding: ${gap.medium};
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TabContainer = styled.div`
  background-color: ${colors.lightGray};
  height: 100%;
  width: 100%;
  padding: ${gap.small} ${gap.medium};
`;

function View() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  function GetTab() {
    switch (tabIndex) {
      case 0:
        return <FileTab />;
      case 1:
        return <HistoryTab />;
      default:
        return "";
    }
  }
  return (
    <Container>
      <VerticalSeparator color={colors.lightGray} length={80} />
      <Sidebar>
        <SidebarButton style={{ opacity: tabIndex === 0 ? 1 : 0.5 }} onClick={() => setTabIndex(0)}>
          <DownloadIcon width={20} height={20} color={colors.darkGray} />
          <div style={{ lineHeight: font.size.small }}>Files</div>
        </SidebarButton>
        <HorizontalSeparator length={24} />
        <SidebarButton style={{ opacity: tabIndex === 1 ? 1 : 0.5 }} onClick={() => setTabIndex(1)}>
          <HistoryIcon width={35} height={10} color={colors.darkGray} />
          <div style={{ lineHeight: font.size.small }}>History</div>
        </SidebarButton>
      </Sidebar>
      <TabContainer>{GetTab()}</TabContainer>
    </Container>
  );
}

export default View;
