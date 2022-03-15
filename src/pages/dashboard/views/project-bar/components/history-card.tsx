import styled from "styled-components";
import React from "react";
import { DateTime } from "luxon";
import { colors, font, gap, radius, shadow } from "../../../../../theme/variables";
import RoundedCube from "../../../../../components/RoundCube";
import { BellIcon } from "../../../../../components/icons";
import { IHistory, IUser } from "../../../../../types/types";
import { useAppSelector } from "../../../../../redux/hooks";

const Container = styled.div`
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
const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  font-size: ${font.size.medium};
  font-weight: ${font.weight.normal};
  color: ${colors.gray};
`;
const NotifyHeaderButton = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  gap: 4px;
  color: ${colors.darkGray};
  font-size: ${font.size.small};
  opacity: 1;
  top: -10px;
  background-color: white;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${gap.medium} 0;
  font-weight: ${font.weight.semiBold};
  font-size: ${font.size.large};
  text-align: center;
  color: ${colors.darkGray};
  gap: ${gap.medium};
`;
const Footer = styled.div`
  display: flex;
  font-weight: ${font.weight.thin};
  color: ${colors.gray};
  font-size: ${font.size.medium};
`;
const RedirectLink = styled.div`
  font-weight: ${font.weight.bold};
  color: ${colors.blue};
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: ${colors.darkBlue};
  }
  &:active {
    opacity: 0.8;
  }
`;

/*
 Types of project events:
 --------------------------------
   0 = offer sent
   1 = decline offer
   2 = accept offer
   3 = file upload
   4 = event notification
   5 = general notification
 --------------------------------
 */

enum CardType {
  OfferSent,
  OfferDeclined,
  OfferAccepted,
  FileUploaded,
  EventNotification,
  GeneralNotifcation
}
const GetColor = (type: CardType) => {
  switch (type) {
    case CardType.EventNotification:
      return colors.yellow;

    case CardType.GeneralNotifcation:
      return colors.yellow;

    case CardType.OfferSent:
      return colors.purple;

    case CardType.OfferAccepted:
      return colors.green;

    case CardType.OfferDeclined:
      return colors.red;

    case CardType.FileUploaded:
      return colors.blue;

    default:
      return colors.black;
  }
};

export default function HistoryCard({
  cardData,
  senderData
}: {
  cardData: IHistory;
  senderData: IUser;
}) {
  const selector = useAppSelector((state) => state.app.users);
  const GetUser = (id: string): IUser => {
    const users = selector.filter((user: IUser) => user.id === id);
    return users[0];
  };
  const GetText = (card: IHistory): string => {
    switch (card.type) {
      case CardType.OfferSent:
        return `${GetUser(card.senderId).name} sent an offer!`;
      case CardType.OfferDeclined:
        return `${GetUser(card.senderId).name} declined the offer!`;
      case CardType.OfferAccepted:
        return `${GetUser(card.senderId).name} declined the offer!`;
      case CardType.FileUploaded:
        return `${GetUser(card.senderId).name} uploaded a file!`;
      case CardType.EventNotification:
        return `${GetUser(card.senderId).name} requested a response!`;
      case CardType.GeneralNotifcation:
        return `${GetUser(card.senderId).name}  requested a response!`;

      default:
        return "[ERROR] CARD TYPE DOES NOT EXIST";
    }
  };
  const onHistoryNotify = () => {
    // TODO: Implement dispatch-event and reducer for history.
  };
  const style = {
    left: {
      flex: 1,
      gap: gap.small,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },

    right: {
      display: "flex",
      justifyContent: "flex-end",
      gap: gap.small
    },
    notify: {
      cursor: !cardData.hasNotified ? "pointer" : "",
      opacity: cardData.hasNotified ? 0.3 : ""
    }
  };

  return (
    <Container>
      <Header>
        <div style={style.left}>
          <RoundedCube color={GetColor(cardData.type)} size={11} roundness={100} />
          <div style={{ fontSize: font.size.small }}>
            {DateTime.fromISO(cardData.createdAt).toLocaleString()}
          </div>
        </div>

        <div style={style.right}>
          {cardData.isNotifiable ? (
            <NotifyHeaderButton
              style={style.notify}
              onClick={() => {
                onHistoryNotify();
              }}
            >
              Notify
              <BellIcon height={14} width={14} color={colors.darkGray} />
            </NotifyHeaderButton>
          ) : (
            ""
          )}
          <div>#{cardData.displayId}</div>
        </div>
      </Header>

      <Content>{GetText(cardData)}</Content>

      <Footer>
        {cardData.type === CardType.OfferSent ||
        cardData.type === CardType.GeneralNotifcation ||
        cardData.type === CardType.EventNotification ? (
          <>
            Redirect: <RedirectLink>#412512</RedirectLink>
          </>
        ) : (
          ""
        )}
      </Footer>
    </Container>
  );
}
