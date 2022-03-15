import styled from "styled-components";
import { colors, font } from "../theme/variables";

export enum FontSizes {
  small,
  medium,
  large,
  xLarge,
  xxLarge
}
const GetFontSize = (size: FontSizes) => {
  switch (size) {
    case FontSizes.medium:
      return font.size.medium;
    case FontSizes.large:
      return font.size.large;
    case FontSizes.small:
      return font.size.small;
    case FontSizes.xLarge:
      return font.size.xLarge;
    case FontSizes.xxLarge:
      return font.size.xxLarge;
  }
  return "0px";
};
type props = {
  fontSize: FontSizes;
};
const BaseText = styled.div<props>`
  font-size: ${({ fontSize }) => (fontSize ? GetFontSize(fontSize) : font.size.small)};
`;

export const ThinDG = styled(BaseText)`
  color: ${colors.darkGray};
  font-weight: ${font.weight.thin};
`;
export const ThinG = styled(BaseText)`
  color: ${colors.gray};
  font-weight: ${font.weight.thin};
`;
export const ThinLG = styled(BaseText)`
  color: ${colors.lightGray};
  font-weight: ${font.weight.thin};
`;
export const RegularDG = styled(BaseText)`
  color: ${colors.darkGray};
  font-weight: ${font.weight.normal};
`;
export const RegularG = styled(BaseText)`
  color: ${colors.gray};
  font-weight: ${font.weight.normal};
`;
export const RegularLG = styled(BaseText)`
  color: ${colors.lightGray};
  font-weight: ${font.weight.normal};
`;
export const SemiDG = styled(BaseText)`
  color: ${colors.darkGray};
  font-weight: ${font.weight.semiBold};
`;
export const SemiG = styled(BaseText)`
  color: ${colors.gray};
  font-weight: ${font.weight.semiBold};
`;
export const SemiLG = styled(BaseText)`
  color: ${colors.lightGray};
  font-weight: ${font.weight.semiBold};
`;
export const BoldDG = styled(BaseText)`
  color: ${colors.darkGray};
  font-weight: ${font.weight.bold};
`;
export const BoldG = styled(BaseText)`
  color: ${colors.gray};
  font-weight: ${font.weight.bold};
`;
export const BoldLG = styled(BaseText)`
  color: ${colors.lightGray};
  font-weight: ${font.weight.bold};
`;
