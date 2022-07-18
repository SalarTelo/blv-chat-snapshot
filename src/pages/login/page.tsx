import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { BoldDG, FontSizes } from "../../components/Text";
import { colors, font, gap } from "../../theme/variables";
import { Login } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SET_AUTH_TOKEN, SET_USER_DATA } from "../../redux/action-types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${gap.xxLarge};
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-color: ${colors.white};
`;
const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 50px;
`;
const Container = styled.form`
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: ${gap.small};
`;
const ErrorText = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 40%;
  color: ${colors.darkRed};
  font-weight: bold;
`;
const InputText = styled.input`
  display: flex;
  border-radius: ${gap.small};
  font-size: 16px;
  outline-style: none;
  color: ${colors.darkGray};
  background-color: ${colors.lightGray};
  border-style: solid;
  border-color: transparent;
  transition: 0.05s ease;

  width: 350px;
  height: 50px;
  padding: 0 ${gap.medium};

  &::placeholder {
    color: ${colors.gray};
  }

  &:focus {
    border-color: ${colors.blvGreen};
  }

  &:hover:not(:focus) {
    border-color: ${colors.gray};
  }
`;
const SubmitButton = styled.input`
  color: ${colors.gray};
  font-size: ${font.size.medium};
  font-weight: ${font.weight.semiBold};
  border-style: solid;
  border-color: transparent;
  border-radius: ${gap.small};
  padding: 10px ${gap.large};
  background-color: ${colors.lightGray};
  cursor: pointer;
  transition: 0.1s ease;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    color: ${colors.darkGray};
  }
`;

const SubmitSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

// TODO: ON-SUBMIT SEND TO LOG IN TO API
function Page() {
  const navigator = useNavigate();
  const selector = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [, setToken] = useLocalStorage("auth_token", "");
  const [, setUserData] = useLocalStorage("user_data", "");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isWrongPassword, setIsWrongPass] = useState<boolean>(false);
  return (
    <Wrapper>
      <Header>
        <BoldDG fontSize={FontSizes.large} style={{ fontSize: "64px", fontFamily: "Montserrat" }}>
          <span style={{ color: colors.blvGreen, marginRight: "10px" }}>BLV</span>
          Eiffel
        </BoldDG>
      </Header>

      {!isLoggingIn ? (
        <Container
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const username = e.target[0].value;
            const password = e.target[1].value;
            if (username !== "" && password !== "") {
              setIsLoggingIn(true);
              const data = await Login(username, password);
              setIsLoggingIn(false);

              // Data should probably return something more detailed...
              if (data.error) {
                setIsWrongPass(true);
              } else {
                setToken(data.authToken.token);
                setUserData(data.user);

                dispatch({
                  type: SET_AUTH_TOKEN,
                  payload: data.authToken.token
                });
                dispatch({
                  type: SET_USER_DATA,
                  payload: data.authToken.user
                });

                navigator("/dashboard");
              }
            }
          }}
        >
          <BoldDG
            fontSize={FontSizes.xxLarge}
            style={{ marginBottom: "10px", alignSelf: "flex-start" }}
          >
            Sign In
          </BoldDG>
          <InputText name="username" type="text" placeholder="username" />
          <InputText name="password" type="password" placeholder="password" />
          <SubmitSection>
            <SubmitButton type="submit" value="Login" />
          </SubmitSection>
          {isWrongPassword ? <ErrorText> Username/Password is incorrect...</ErrorText> : ""}
        </Container>
      ) : (
        <BoldDG fontSize={FontSizes.medium}>Loading...</BoldDG>
      )}
    </Wrapper>
  );
}

export default Page;
