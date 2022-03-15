import React, { ChangeEvent, useEffect, useState } from "react";
import { colors, font, gap } from "../../../theme/variables";
import { BoldG, FontSizes, RegularDG } from "../../../components/Text";
import { BasicButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ADD_PROPERTY, SET_OVERLAY_STATE } from "../../../redux/action-types";
import { AddProperty } from "../../../utils/api";
import { ICompany, IProperty } from "../../../types/types";
import { ButtonsContainer, Container, Content, Header, InputRow } from "./styled";
import FormSection from "./components/form-section";
import TextInput from "./components/text-input";
import DropDown from "../../../components/dropdown";

export default function AddPropertyForm() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);
  const [data, setData] = useState<any>({});
  const [selectedCompany, setSelectedCompany] = useState<ICompany>({
    createdAt: "",
    id: "",
    name: "",
    orgNr: "",
    properties: [],
    updatedAt: "",
    users: []
  });

  useEffect(() => {
    if (selector.companies.length > 0) setSelectedCompany(selector.companies[0]);
  }, []);

  const closeForm = () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 0 });
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    setData((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };
  const onCompanySelect = (index: number) => {
    setSelectedCompany(selector.companies[index]);
  };
  const handleSubmit = async () => {
    if (Object.values(data).every((data) => data !== "")) {
      // TODO: There is no validation for any of the fields what-so-ever...
      // Need to make sure that all the data is properly input

      const propertyData: IProperty = {
        companyId: selectedCompany.id,
        projects: [],
        createdAt: "",
        id: "",
        updatedAt: "",
        name: data.name
      };
      const res = await AddProperty(propertyData, selectedCompany);
      dispatch({ type: ADD_PROPERTY, payload: res });
      dispatch({ type: SET_OVERLAY_STATE, payload: 0 });
    }
  };
  return (
    <Container>
      <Header>
        <BoldG fontSize={FontSizes.xLarge}>Add Property for</BoldG>
        <DropDown
          onSelect={onCompanySelect}
          items={selector.companies.map((company: ICompany) => company.name)}
        />
      </Header>
      <Content>
        <FormSection title="Invoice Information For Property">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              userSelect: "none"
            }}
          >
            <input type="checkbox" />
            <RegularDG fontSize={FontSizes.medium}>Use {selectedCompany?.name}'s details</RegularDG>
          </div>
          <InputRow>
            <TextInput onChange={handleInputChange} name="name" label="Company Name" />
            <TextInput onChange={handleInputChange} name="orgNr" label="Organization Number" />
          </InputRow>
          <InputRow>
            <TextInput onChange={handleInputChange} name="marking" label="Märkning" />
            <TextInput onChange={handleInputChange} name="gln" label="GLN" />
          </InputRow>
          <InputRow>
            <TextInput
              onChange={handleInputChange}
              name="referencePerson"
              label="Reference Person"
            />
          </InputRow>
        </FormSection>

        <FormSection title="Property Description For Property">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              userSelect: "none"
            }}
          >
            <input type="checkbox" />
            <RegularDG fontSize={FontSizes.medium}>Use {selectedCompany?.name}'s details</RegularDG>
          </div>
          <InputRow>
            <TextInput onChange={handleInputChange} name="address" label="Address" />
            <TextInput
              onChange={handleInputChange}
              name="propertyDesignation"
              label="Property Designation"
            />
          </InputRow>
          <InputRow>
            <TextInput onChange={handleInputChange} name="county" label="County" />
            <TextInput onChange={handleInputChange} name="city" label="City" />
          </InputRow>
        </FormSection>
        <ButtonsContainer>
          <BasicButton
            color={colors.white}
            backgroundColor={colors.darkGray}
            fitContent
            onClick={async (e) => {
              e.preventDefault();
              await handleSubmit();
            }}
          >
            <div style={{ fontSize: font.size.medium, padding: `${gap.xSmall} ${gap.small} ` }}>
              Add
            </div>
          </BasicButton>

          <BasicButton
            color={colors.white}
            backgroundColor={colors.red}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              closeForm();
            }}
          >
            <div
              style={{
                fontSize: font.size.medium,
                padding: `${gap.xSmall} ${gap.small} `,
                width: "150px"
              }}
            >
              Cancel
            </div>
          </BasicButton>
        </ButtonsContainer>
      </Content>
    </Container>
  );
}
