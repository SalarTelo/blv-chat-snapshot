import React from "react";
import { colors } from "../../../../theme/variables";
import { FilterIcon } from "../../../../components/icons";
import { BasicButton } from "../../../../components/buttons";
import { Container, FilterRow, UserTitle } from "./styled-components";
import { BoldDG, FontSizes } from "../../../../components/Text";
import { useAppSelector } from "../../../../redux/hooks";
import CompanyCreationFooter from "./components/company-creation-footer";
import ServerList from "./components/server-list";

function View() {
  const username = useAppSelector((state) => state.app.userData.name);
  return (
    <Container>
      <UserTitle>
        <BoldDG fontSize={FontSizes.xLarge}>{username}</BoldDG>
      </UserTitle>

      {/* TEMPORARY. We don't need filtering for now */}
      {false ? (
        <FilterRow>
          <BasicButton>
            <FilterIcon height={14} width={14} color={colors.gray} />
            <div>Filter</div>
          </BasicButton>
        </FilterRow>
      ) : (
        ""
      )}
      <ServerList />
      <CompanyCreationFooter />
    </Container>
  );
}

export default View;
