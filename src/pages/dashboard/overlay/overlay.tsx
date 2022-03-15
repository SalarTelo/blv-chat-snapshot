import React from "react";
import { Overlay } from "../views/content/styled";
import AddCompanyForm from "./add-company-form";
import { useAppSelector } from "../../../redux/hooks";
import AddPropertyForm from "./add-property-form";
import AddProjectForm from "./add-project-form";

// TODO: figure out why the blurry backgrounds (userSelect: none) when overlay is active does not work .
export default function FormOverlay() {
  const selector = useAppSelector((state) => state.app.overlayState);

  if (selector === 0) return null;

  return (
    <Overlay>
      {selector === 1 ? <AddCompanyForm /> : ""}
      {selector === 2 ? <AddPropertyForm /> : ""}
      {selector === 3 ? <AddProjectForm /> : ""}
    </Overlay>
  );
}
