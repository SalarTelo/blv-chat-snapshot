import React, { useEffect, useState } from "react";
import { logError } from "vite/dist/node/server/middlewares/error";
import { forEach } from "lodash";
import StylesCSS from "./stylesheet.module.scss";
import { colors, font, gap, radius, shadow } from "../../../../theme/variables";
import Accordion from "../../../../components/atom/accordion";
import { FilterIcon, HomeIcon, PlusIcon } from "../../../../components/atom/icons";
import HeaderNsub from "../../../../components/atom/headerNsub";
import { BasicButton, PlusButton } from "../../../../components/atom/buttons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../components/atom/separator";
import { UnderlineInput } from "../../../../components/atom/Input";
import {
  CompanyList,
  Container,
  FilterRow,
  PropertyContainer,
  UserTitle
} from "./styled-components";
import { BoldDG, FontSizes } from "../../../../components/atom/Text";
import { ICompany, IProperty } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY,
  UPDATE_CURRENT_PROJECT
} from "../../../../redux/action-types";

function FooterForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const style = {
    container: {
      backgroundColor: colors.white,
      borderRadius: radius.small,
      boxShadow: shadow.defaultBox,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: gap.medium,
      color: colors.darkGray,
      fontSize: font.size.large,
      fontWeight: font.weight.thin,
      cursor: isOpen ? "" : "pointer"
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: gap.small
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginTop: gap.medium,
      gap: gap.medium,
      buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: gap.small,
        width: "100%"
      }
    }
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isOpen) setIsOpen(true);
  };
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isOpen) setIsOpen(false);
  };
  return (
    <div style={style.container} onClick={handleOpen}>
      <div style={style.header}>
        Add Company
        <PlusIcon height={13} width={13} color={colors.darkGray} />
      </div>
      {isOpen ? (
        <form style={style.form}>
          <UnderlineInput placeholder="org nr." isRequired />
          <div style={style.form.buttonContainer}>
            <BasicButton
              style={{ flex: 1 }}
              color={colors.white}
              onClick={handleClose}
              backgroundColor={colors.darkGray}
            >
              Add
            </BasicButton>
            <BasicButton color={colors.white} onClick={handleClose} backgroundColor={colors.red}>
              Close
            </BasicButton>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

function PropertyItem({
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
    <div className={`${StylesCSS.listItem}`} style={style.listItem}>
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
function ServerList() {
  const selector = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [selectedProperty, setSelectedProperty] = useState<string>();
  const [companyList, setCompanyList] = useState<ICompany[]>();

  const onPropertySelect = (property: IProperty) => {
    dispatch({
      type: SET_SELECTED_PROJECT,
      payload: property.projects[0]
    });
    dispatch({
      type: SET_SELECTED_PROPERTY,
      payload: property
    });
    setSelectedProperty(property.id);
  };

  useEffect(() => {
    setCompanyList(selector.companyList);
    setSelectedProperty(selector.selectedPropertyId);
  }, [selector.companyList, selector.selectedPropertyId]);
  return (
    <CompanyList>
      {companyList?.map((company) => {
        return (
          <Accordion
            key={company.id}
            headerContent={
              <HeaderNsub
                HeaderText={`#${company.name}`}
                SubText={`${company.properties.length} properties`}
              />
            }
          >
            <PropertyContainer>
              {company.properties.map((property) => {
                return (
                  <PropertyItem
                    key={property.id}
                    name={property.name}
                    isSelected={selectedProperty === property.id}
                    onClick={() => onPropertySelect(property)}
                  />
                );
              })}
              <div
                style={{
                  gap: gap.medium,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <HorizontalSeparator color={colors.gray} length={48} />
                <PlusButton height={13} width={13} />
              </div>
            </PropertyContainer>
          </Accordion>
        );
      })}
    </CompanyList>
  );
}

function View() {
  const username = useAppSelector((state) => state.app.userData.name);
  return (
    <Container>
      <UserTitle>
        <BoldDG fontSize={FontSizes.xLarge}>{username}</BoldDG>
      </UserTitle>
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
      <FooterForm />
    </Container>
  );
}

export default View;
