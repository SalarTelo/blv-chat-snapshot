import React from "react";
import { colors, font } from "../../../../../theme/variables";
import StylesCSS from "../stylesheet.module.scss";
import { HomeIcon } from "../../../../../components/icons";
import { VerticalSeparator } from "../../../../../components/separator";
import HeaderNsub from "../../../../../components/headerNsub";
import { PlusButton } from "../../../../../components/buttons";

export default function PropertyItem({
  name,
  isSelected,
  onClick
}: {
  name: string;
  isSelected: boolean;
  onClick?: () => void;
}) {
  const style = {
    listItem: {
      opacity: isSelected ? 1 : 0.4
    },
    tab: {
      width: "4px",
      height: isSelected ? font.size.xLarge : font.size.small,
      backgroundColor: colors.darkGray
    }
  };
  return (
    <div className={StylesCSS.listItem} style={style.listItem}>
      <div className={StylesCSS.left} onClick={onClick}>
        <div className={StylesCSS.tabBar} style={style.tab} />
        <HomeIcon color={colors.darkGray} />
        <VerticalSeparator color={colors.darkGray} length={16} />
        <HeaderNsub HeaderText={name} SubText="1 Project" />
      </div>
      <div className={StylesCSS.right}>
        <PlusButton height={10} width={10} color={colors.darkGray} />
      </div>
    </div>
  );
}
