import React from "react";
import styled from "styled-components";
import * as UMath from "../utils/math";
import { colors, shadow } from "../theme/variables";

type props = {
  roundness?: number;
  color?: string;
  size?: number;
  hasShadows?: boolean;
  transitionTime?: string;
};
const RoundedCube = styled.div<props>`
  height: ${({ size }) => `${size}px` || "25px"};
  width: ${({ size }) => `${size}px` || "25px"};

  border-radius: ${({ roundness }) =>
    roundness ? `${UMath.Clamp(roundness, 0, 100) * 0.5}%` : "25%"};
  background-color: ${({ color }) => color || colors.red};

  box-shadow: ${({ hasShadows }) => (hasShadows ? shadow.defaultBox : 0)};

  transition: ${({ transitionTime }) => transitionTime || "0s"};
`;

export default RoundedCube;
