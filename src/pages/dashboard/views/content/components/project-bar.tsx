import React from "react";
import styled from "styled-components";
import { VerticalSeparator } from "../../../../../components/separator";
import { colors, font, gap } from "../../../../../theme/variables";
import { PlusButton } from "../../../../../components/buttons";
import { IProject } from "../../../../../types/types";
import { SET_OVERLAY_STATE } from "../../../../../redux/action-types";
import { useAppDispatch } from "../../../../../redux/hooks";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: ${font.weight.semiBold};
  color: ${colors.darkGray};
  padding: ${gap.medium};
  gap: ${gap.medium};
  font-size: ${gap.medium};
`;
const Tab = styled.div`
  cursor: pointer;
`;

type props = {
  projectList: IProject[];
  onProjectSelect: (project: IProject) => void;
  selectedProject: IProject;
};
export default function ProjectBar({ projectList, selectedProject, onProjectSelect }: props) {
  const dispatch = useAppDispatch();
  const addProject = () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 3 });
  };

  return (
    <Container>
      {projectList?.map((project) => {
        return (
          <div
            key={project.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: gap.xSmall
            }}
          >
            <Tab
              onClick={() => {
                onProjectSelect(project);
              }}
              style={{
                opacity: selectedProject?.id === project.id ? 1 : 0.6
              }}
            >
              {project.name}
            </Tab>
            <div
              style={{
                height: "4px",
                width: selectedProject?.id === project.id ? "50px" : font.size.xLarge,
                backgroundColor: colors.darkGray,
                opacity: selectedProject?.id === project.id ? 1 : 0.6,
                borderRadius: 9999
              }}
            />
          </div>
        );
      })}
      <VerticalSeparator color={colors.gray} length={16} />
      <PlusButton height={13} width={13} onClick={() => addProject()} />
    </Container>
  );
}
