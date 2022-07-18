import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { ICompany, IProject, IProperty } from "../../../../../types/types";
import {
  SET_OVERLAY_STATE,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY
} from "../../../../../redux/action-types";
import { CompanyList, PropertyContainer } from "../styled-components";
import Accordion from "../../../../../components/accordion";
import HeaderNsub from "../../../../../components/headerNsub";
import PropertyItem from "./property-item";
import { colors, gap } from "../../../../../theme/variables";
import { HorizontalSeparator } from "../../../../../components/separator";
import { PlusButton } from "../../../../../components/buttons";

export default function ServerList() {
  const selector = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onPropertySelect = (property: IProperty) => {
    dispatch({
      type: SET_SELECTED_PROPERTY,
      payload: property
    });

    if (property.projects.length > 0) {
      dispatch({
        type: SET_SELECTED_PROJECT,
        payload: property.projects[0]
      });
    } else {
      const dummyProject: IProject = {
        createdAt: "",
        files: [],
        history: [],
        id: "",
        messages: [],
        name: "",
        propertyId: "",
        stage: 0,
        stageStatus: 0,
        updatedAt: "",
        users: []
      };

      dispatch({
        type: SET_SELECTED_PROJECT,
        payload: dummyProject
      });
    }
  };

  return (
    <CompanyList>
      {selector.companies?.map((company: ICompany) => {
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
              {selector.properties
                .filter((property: IProperty) => property.companyId === company.id)
                .map((property: IProperty) => {
                  return (
                    <PropertyItem
                      key={property.id}
                      name={property.name}
                      isSelected={selector.selectedPropertyId === property.id}
                      onClick={() => onPropertySelect(property)}
                    />
                  );
                })}
              <div
                style={{
                  gap: gap.medium,
                  marginTop: gap.small,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <HorizontalSeparator color={colors.gray} length={48} />
                <PlusButton
                  onClick={() => {
                    dispatch({
                      type: SET_OVERLAY_STATE,
                      payload: 2
                    });
                  }}
                  height={13}
                  width={13}
                />
              </div>
            </PropertyContainer>
          </Accordion>
        );
      })}
    </CompanyList>
  );
}
