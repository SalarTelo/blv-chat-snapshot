import React, { ChangeEvent, useEffect, useState } from "react";
import { colors, font, gap } from "../../../theme/variables";
import { BoldG, FontSizes } from "../../../components/Text";
import { BasicButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ADD_PROJECT, ADD_PROPERTY, SET_OVERLAY_STATE } from "../../../redux/action-types";
import {
  ButtonsContainer,
  Container,
  Content,
  Header,
  InputRow,
  InputText,
  TextareaForm
} from "./styled";
import FormSection from "./components/form-section";
import Checkbox from "../../../components/checkbox";
import DropDown from "../../../components/dropdown";
import { ICompany, IProject, IProperty } from "../../../types/types";
import { AddProject, AddProperty } from "../../../utils/api";

export default function AddProjectForm() {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.app);

  const [data, setData] = useState<IProject>({
    building_permit: false,
    construction: false,
    createdAt: "",
    dimensional_cert: false,
    energy_calculation: false,
    files: [],
    fire_doc: false,
    history: [],
    id: "",
    k_doc: false,
    ka: false,
    messages: [],
    moisture_safety_description: false,
    name: "",
    propertyId: "",
    rendering: false,
    stage: 0,
    stageStatus: 0,
    u_value: false,
    updatedAt: "",
    users: [],
    va: false,
    vvs: false,
    description: "",
    custom_request: ""
  });
  const [selectedCompany, setSelectedCompany] = useState<ICompany>({
    createdAt: "",
    id: "",
    name: "",
    orgNr: "",
    properties: [],
    updatedAt: "",
    users: []
  });
  const [selectedProperty, setSelectedProperty] = useState<IProperty>({
    companyId: "",
    createdAt: "",
    id: "",
    name: "",
    projects: [],
    updatedAt: ""
  });

  const closeForm = () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 0 });
  };
  const handleCheckboxToggle = (name: string, value: boolean) => {
    setData((prev: any) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    setData((prevVal) => {
      return {
        ...prevVal,
        [name]: value
      };
    });
  };
  useEffect(() => {
    if (selectedCompany.id === "") {
      setSelectedCompany(selector.companies[0]);
    }
    if (
      selectedCompany?.id !== selectedProperty?.companyId &&
      selectedCompany?.properties.length > 0
    ) {
      setSelectedProperty(selectedCompany?.properties[0]);
    }
  }, [selectedCompany]);

  const onCompanySelect = (index: number) => {
    setSelectedCompany(selector.companies[index]);
  };
  const onPropertySelect = (index: number) => {
    setSelectedProperty(selector.properties[index]);
    setData((prevState) => {
      return {
        ...prevState,
        propertyId: selector.properties[index].id
      };
    });
  };

  const handleSubmit = async () => {
    const res = await AddProject(data, selectedProperty, selector.userData);
    dispatch({ type: ADD_PROJECT, payload: res });
    dispatch({ type: SET_OVERLAY_STATE, payload: 0 });
  };
  return (
    <Container>
      <Header>
        <BoldG fontSize={FontSizes.xLarge}>Request project for</BoldG>
        <DropDown
          items={selector.properties
            .filter((property: IProperty) => property.companyId === selectedCompany.id)
            .map((property: IProperty) => property.name)}
          onSelect={onPropertySelect}
        />
        <BoldG fontSize={FontSizes.xLarge}>in</BoldG>
        <DropDown
          items={selector.companies.map((company: ICompany) => company.name)}
          onSelect={onCompanySelect}
        />
      </Header>
      <Content>
        <FormSection title="Project Name">
          <InputText name="name" onChange={handleChange} style={{ width: "100%" }} />
        </FormSection>
        <FormSection title="Project Description">
          <TextareaForm
            name="description"
            style={{ width: "100%", height: "200px" }}
            onChange={handleChange}
          />
        </FormSection>
        <FormSection title="Order Options">
          <InputRow>
            <Checkbox
              onToggle={handleCheckboxToggle}
              name="building_permit"
              label="Bygglovsritningar"
            />
            <Checkbox onToggle={handleCheckboxToggle} name="construction" label="Konstruktion" />
            <Checkbox
              onToggle={handleCheckboxToggle}
              name="energy_calculation"
              label="Energiberäkning"
            />
          </InputRow>
          <InputRow>
            <Checkbox onToggle={handleCheckboxToggle} name="u_value" label="U-Värde" />
            <Checkbox onToggle={handleCheckboxToggle} name="k_doc" label="K Dokumentation" />
            <Checkbox
              onToggle={handleCheckboxToggle}
              name="moisture_safety_description"
              label="Fukt-Säker.beskrivning"
            />
          </InputRow>
          <InputRow>
            <Checkbox onToggle={handleCheckboxToggle} name="vvs" label="VVS" />
            <Checkbox onToggle={handleCheckboxToggle} name="fire_doc" label="Brand Dokumentation" />
            <Checkbox
              onToggle={handleCheckboxToggle}
              name="dimensional_cert"
              label="Dimension. Intyg"
            />
          </InputRow>
          <InputRow>
            <Checkbox onToggle={handleCheckboxToggle} name="rendering" label="Rendering" />
            <Checkbox onToggle={handleCheckboxToggle} name="ka" label="KA" />
            <Checkbox onToggle={handleCheckboxToggle} name="va" label="VA" />
          </InputRow>
        </FormSection>
        <FormSection title="Custom Request (optional)">
          <TextareaForm
            name="custom_request"
            style={{ width: "100%", height: "100px" }}
            onChange={handleChange}
          />
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
