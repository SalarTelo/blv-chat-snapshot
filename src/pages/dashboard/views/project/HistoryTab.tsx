import styled from "styled-components";
import React, { useState } from "react";
import { colors, font, gap, radius, shadow } from "../../../../theme/variables";
import { BellIcon } from "../../../../components/atom/icons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../components/atom/separator";
import SidebarTab from "./TabTemplate";
import { BasicButton } from "../../../../components/atom/buttons";

const HistoryContainer = styled.div`
  background-color: ${colors.white};
  padding: ${gap.medium};
  font-weight: ${font.weight.semiBold};
  color: ${colors.darkGray};
  font-size: ${font.size.large};
  border-radius: ${radius.small};
  display: flex;
  flex-direction: column;
  width: 310px;
  justify-content: center;
  align-items: flex-start;
  box-shadow: ${shadow.defaultBox};
  user-select: none;
`;
const HistoryHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  font-size: ${font.size.medium};
  font-weight: ${font.weight.normal};
  color: ${colors.gray};
`;
enum CardType {
  Reminder,
  Request,
  File,
  Accept,
  Decline
}
type HistoryProp = {
  type: CardType;
  content: string;
  dateStamp: string;
  subContent?: React.ReactNode;
  notifiable?: boolean;
  hasNotified?: boolean;
};
function HistoryCard({ type, content, subContent, dateStamp, notifiable }: HistoryProp) {
  const GetColor = () => {
    switch (type) {
      case CardType.Reminder:
        return colors.yellow;

      case CardType.Request:
        return colors.purple;

      case CardType.File:
        return colors.blue;

      case CardType.Accept:
        return colors.green;

      case CardType.Decline:
        return colors.red;
      default:
        return colors.black;
    }
  };
  const [isNotified, setNotified] = useState<boolean>(false);
  const style = {
    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center"
    },
    circle: {
      width: "11px",
      height: "11px",
      borderRadius: "50%",
      backgroundColor: GetColor()
    },
    time: {
      fontSize: font.size.medium
    },
    content: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      padding: `${gap.medium} 0`,
      fontWeight: font.weight.semiBold,
      fontSize: font.size.large,
      textAlign: "center",
      color: colors.darkGray,
      gap: gap.medium
    },
    subContent: {
      fontWeight: font.weight.normal,
      color: colors.gray,
      fontSize: font.size.medium,
      link: {
        fontWeight: font.weight.bold,
        color: colors.blue
      }
    },
    left: {
      gap: gap.small,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    right: {
      display: "flex",
      justifyContent: "flex-end"
    },
    notify: {
      display: "flex",
      alignItems: "center",
      userSelect: "none",
      gap: "4px",
      cursor: !isNotified ? "pointer" : "",
      opacity: isNotified ? 0.3 : 1,
      color: colors.darkGray,
      fontSize: font.size.small
    }
  };
  return (
    <HistoryContainer>
      <HistoryHeader>
        <div style={style.left}>
          <div style={style.circle} />
          <div style={style.time}>{dateStamp}</div>
        </div>
        <div style={style.right}>
          {notifiable ? (
            <div
              style={style.notify}
              onClick={() => {
                setNotified(true);
              }}
            >
              <BellIcon height={13} width={13} color={colors.darkGray} />
              Notify
            </div>
          ) : (
            ""
          )}
        </div>
      </HistoryHeader>
      <div style={style.content}>
        <div>{content}</div>
        {subContent ? <div style={style.subContent}>{subContent}</div> : ""}
      </div>
    </HistoryContainer>
  );
}
function Footer({ onRequestRes }: { onRequestRes: () => void }) {
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: gap.small
    },
    RequestButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: gap.small,
      color: colors.darkGray,
      fontSize: font.size.large,
      cursor: "pointer",
      userSelect: "none",
      padding: `${gap.small} 0`,
      fontWeight: font.weight.thin
    }
  };
  return (
    <div style={style.container}>
      <div style={style.RequestButton} onClick={() => onRequestRes()}>
        <BellIcon width={32} height={32} />
        <VerticalSeparator length={16} color={colors.gray} />
        Request Response
      </div>
      <HorizontalSeparator length={200} color={colors.gray} />
      <BasicButton
        color={colors.darkGray}
        fitContent
        style={{
          fontSize: font.size.large,
          padding: `${gap.medium} ${gap.large}`,
          fontWeight: font.weight.thin
        }}
      >
        Send ÄTA invoice
      </BasicButton>
    </div>
  );
}
export default function HistoryTab() {
  const [HistoryCards, setHistory] = useState([
    {
      id: 23145,
      type: CardType.Request,
      content: "You have sent an offer to Jhona Alver!",
      timeStamp: new Date().toISOString().slice(0, 10),
      notifiable: true,
      hasNotified: true
    },
    {
      id: 51232,
      type: CardType.Reminder,
      content: "You have notified Jhona Alver!",
      timeStamp: new Date().toISOString().slice(0, 10),
      notifiable: false
    },
    {
      id: 55123,
      type: CardType.Accept,
      content: "Jhona Alver has accepted your offer!",
      timeStamp: new Date().toISOString().slice(0, 10),
      notifiable: false
    }
  ]);
  const onRequestResponse = () => {
    const card = {
      id: Math.round(Math.random() * 10000),
      type: CardType.Reminder,
      content: "You have requested a response from Jhona Alver!",
      timeStamp: new Date().toISOString().slice(0, 10),
      notifiable: false
    };
    setHistory((current) => [...current, card]);
  };
  const style = {
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    header: {
      title: {
        fontSize: font.size.xxLarge,
        fontWeight: font.weight.bold,
        color: colors.darkGray
      },
      sub: {
        fontSize: font.size.large,
        color: colors.darkGray
      }
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: gap.medium
    }
  };
  return (
    <SidebarTab
      title="History"
      subTitle="This has happened..."
      footer={<Footer onRequestRes={() => onRequestResponse()} />}
    >
      <div style={style.content}>
        {HistoryCards.map((card) => {
          return (
            <HistoryCard
              key={card.id}
              type={card.type}
              notifiable={card.notifiable}
              dateStamp={card.timeStamp}
              content={card.content}
              hasNotified={card.hasNotified}
            />
          );
        })}
      </div>
    </SidebarTab>
  );
}
