import React, { useState } from "react";
import StylesCSS from "./stylesheet.module.scss";
import { colors, font, gap, radius, shadow } from "../../../../theme/variables";
import Accordion from "../../../../components/atom/accordion";
import { FilterIcon, HomeIcon, PlusIcon } from "../../../../components/atom/icons";
import HeaderNsub from "../../../../components/atom/headerNsub";
import { BasicButton, PlusButton } from "../../../../components/atom/buttons";
import { HorizontalSeparator, VerticalSeparator } from "../../../../components/atom/separator";
import { UnderLineInput } from "../../../../components/atom/Input";
import {
  Container,
  FilterRow,
  UserTitle,
  CompanyList,
  PropertyContainer
} from "./styled-components";

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
          <UnderLineInput placeholder="org nr." isRequired />
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
  onClick: () => void;
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
        <HeaderNsub HeaderText={name ?? "No Name"} SubText="1 Project" />
      </div>
      <div className={StylesCSS.right}>
        <PlusButton height={10} width={10} color={colors.darkGray} />
      </div>
    </div>
  );
}
function ServerList() {
  const [selectedProperty, setSelectedProperty] = useState<number>(() => 0);
  const array = [
    {
      id: 125121,
      name: "Property 1",
      projects: [
        {
          id: 125213,
          name: "Project 1"
        },
        {
          id: 512342,
          name: "Project 2"
        },
        {
          id: 125161,
          name: "Project 3"
        }
      ]
    },
    {
      id: 151251,
      name: "Property 2",
      projects: [
        {
          id: 152321,
          name: "Project 1"
        }
      ]
    }
  ];
  return (
    <CompanyList>
      {array.map((property, index) => {
        return (
          <Accordion
            key={property.id}
            headerContent={
              <HeaderNsub
                HeaderText={`#Company ${index + 1}`}
                SubText={`${property.projects.length} Property`}
              />
            }
          >
            <PropertyContainer>
              {property.projects.map((project) => {
                return (
                  <PropertyItem
                    onClick={() => setSelectedProperty(project.id)}
                    key={project.id}
                    name={project.name}
                    isSelected={selectedProperty === project.id}
                  />
                );
              })}
              <div style={{ gap: gap.medium, display: "flex", flexDirection: "column" }}>
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
function ServerView() {
  const [titleName] = useState<String>("Bygglovsverket");
  return (
    <Container>
      <UserTitle>{titleName}</UserTitle>
      <FilterRow>
        <BasicButton>
          <FilterIcon height={14} width={14} color={colors.gray} />
          <div>Filter</div>
        </BasicButton>
      </FilterRow>
      <ServerList />
      <FooterForm />
    </Container>
  );
}

export default ServerView;
