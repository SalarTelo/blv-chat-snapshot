import React, { ChangeEvent, useState } from "react";
import { colors, font, gap } from "../../../theme/variables";
import { BoldG, FontSizes } from "../../../components/Text";
import { BasicButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ADD_COMPANY, SET_OVERLAY_STATE } from "../../../redux/action-types";
import { ICompany } from "../../../types/types";
import { AddCompany } from "../../../utils/api";
import { ButtonsContainer, Container, Content, Header, InputRow } from "./styled";
import FormSection from "./components/form-section";
import TextInput from "./components/text-input";

interface CompanyData {
  name: string;
  orgNr: string;
  marking: string;
  referencePerson: string;
  gln: string;
  address: string;
  propertyDesignation: string;
  county: string;
  city: string;
}
export default function AddCompanyForm() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);
  const [companyData, setData] = useState<CompanyData>({
    address: "",
    city: "",
    county: "",
    propertyDesignation: "",
    gln: "",
    marking: "",
    name: "",
    orgNr: "",
    referencePerson: ""
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    setData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const closeForm = () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 0 });
  };

  const handleSubmit = async () => {
    if (Object.values(companyData).every((data) => data !== "")) {
      // TODO: There is no validation for any of the fields what-so-ever...
      // Need to make sure that all the data is properly input
      const sendData: ICompany = {
        createdAt: "",
        id: "",
        properties: [],
        updatedAt: "",
        users: [],
        name: companyData.name,
        orgNr: companyData.orgNr
      };
      const res = await AddCompany(sendData, selector.userData);
      dispatch({ type: ADD_COMPANY, payload: res });
      closeForm();
    }
  };
  return (
    <Container>
      <Header>
        <BoldG fontSize={FontSizes.xLarge}>Add Company</BoldG>
      </Header>
      <Content>
        <FormSection title="Invoice Information">
          <InputRow>
            <TextInput onChange={handleInputChange} name="name" label="Company Name" />
            <TextInput onChange={handleInputChange} name="marking" label="Märkning" />
            <TextInput onChange={handleInputChange} name="gln" label="GLN" />
          </InputRow>
          <InputRow>
            <TextInput onChange={handleInputChange} name="orgNr" label="Organization Number" />
            <TextInput
              onChange={handleInputChange}
              name="referencePerson"
              label="Reference Person"
            />
          </InputRow>

        </FormSection>

        <FormSection title="Property description">
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
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
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
