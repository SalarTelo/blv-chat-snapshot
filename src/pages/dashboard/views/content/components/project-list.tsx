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
  padding: ${gap.medium} 0 0 ${gap.medium};
  font-size: ${gap.medium};
`;
const TabUnderline = styled.div`
  transition: 0.2s;
  height: 5px;
  width: 5px;
  border-radius: 9999px;
  background-color: ${colors.darkGray};
`;
const Tab = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${gap.small} ${gap.medium};
  opacity: 0.3;
  &:hover {
    opacity: 0.7;
  }
  &:hover {
    ${TabUnderline} {
      width: 15px;
    }
  }
`;

const Sidebar = styled.div`
  display: flex;
  gap: ${gap.medium};
`;
type props = {
  projectList: IProject[];
  onProjectSelect: (project: IProject) => void;
  selectedProject: IProject;
};
export default function ProjectList({ projectList, selectedProject, onProjectSelect }: props) {
  const dispatch = useAppDispatch();
  const addProject = () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 3 });
  };

  return (
    <Container>
      {projectList.map((project, index) => {
        return (
          <div
            key={project.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Tab
              onClick={() => onProjectSelect(project)}
              style={{ opacity: selectedProject.id === project.id ? 1 : "" }}
            >
              {project.name}
              <TabUnderline
                style={{
                  width: selectedProject.id === project.id ? font.size.xxLarge : ""
                }}
              />
            </Tab>
            {index !== projectList.length - 1 ? (
              <VerticalSeparator color={colors.gray} length={16} />
            ) : (
              ""
            )}
          </div>
        );
      })}

      <Sidebar>
        <VerticalSeparator color={colors.gray} length={16} />
        <PlusButton height={13} width={13} onClick={() => addProject()} />
      </Sidebar>
    </Container>
  );
}
