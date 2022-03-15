import React, { useState } from "react";
import { colors, font } from "../../../../theme/variables";
import { DownloadIcon, HistoryIcon } from "../../../../components/icons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../components/separator";
import HistoryTab from "./components/history-tab";
import FileTab from "./components/file-tab";
import { Container, Sidebar, SidebarButton, TabContainer } from "./styled";

function GetTab(tabIndex: number) {
  switch (tabIndex) {
    case 0:
      return <FileTab />;
    case 1:
      return <HistoryTab />;
    default:
      return "";
  }
}

function View() {
  const [tabIndex, setTabIndex] = useState<number>(-1);
  const handleTabSelection = (value: number) => {
    setTabIndex((current) => {
      if (value === current) return -1;
      return value;
    });
  };

  return (
    <Container>
      <VerticalSeparator color={colors.lightGray} length={80} />
      <Sidebar>
        <SidebarButton
          style={{ opacity: tabIndex === 0 ? 1 : 0.5 }}
          onClick={() => handleTabSelection(0)}
        >
          <DownloadIcon width={20} height={20} color={colors.darkGray} />
          <div style={{ lineHeight: font.size.small }}>Files</div>
        </SidebarButton>
        <HorizontalSeparator length={24} />
        <SidebarButton
          style={{ opacity: tabIndex === 1 ? 1 : 0.5 }}
          onClick={() => handleTabSelection(1)}
        >
          <HistoryIcon width={35} height={10} color={colors.darkGray} />
          <div style={{ lineHeight: font.size.small }}>History</div>
        </SidebarButton>
      </Sidebar>
      {tabIndex !== -1 ? <TabContainer>{GetTab(tabIndex)}</TabContainer> : ""}
    </Container>
  );
}

export default View;
