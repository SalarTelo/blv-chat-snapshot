import styled from "styled-components";
import { colors, font, gap, radius, shadow } from "../../../theme/variables";

export const Container = styled.form`
  display: flex;

  flex-direction: column;
  padding: ${gap.large};
  border-radius: ${radius.normal};
  background-color: ${colors.lightGray};
  box-shadow: ${shadow.defaultBox};
  min-width: 700px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  user-select: none;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${gap.small};
  padding-bottom: ${gap.medium};
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gap.large};
`;
export const InputContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
export const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: ${gap.small};
`;
export const InputText = styled.input`
  gap: ${gap.medium};
  font-size: ${font.size.medium};
  padding: 12px;
  border-radius: ${radius.normal};
  outline-width: 3px;
  outline-color: ${colors.gray};
  box-shadow: ${shadow.defaultBox};
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  &:focus {
    outline-style: none !important;
    border-width: 2px;
    border-style: solid;
    border-color: ${colors.blue};
  }
`;
export const Section = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: ${gap.small};
`;
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: ${gap.medium};
`;

export const TextareaForm = styled.textarea`
  background-color: ${colors.white};
  border-radius: ${radius.normal};
  border-style: none;
  box-shadow: ${shadow.defaultBox};
  outline-style: none;
  padding: ${gap.medium};
  color: ${colors.black};
  font-size: ${font.size.medium};
  font-weight: ${font.weight.normal};
  resize: none;
`;
