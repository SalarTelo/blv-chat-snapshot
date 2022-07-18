import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile, IMessage, IProject, IUser } from "../../../types/types";

type props = {
  projects: {
    [key: string]: {
      project: IProject;
      page: number;
    };
  };
  selectedProjectId: string;
};

const initialState: props = {
  projects: {},
  selectedProjectId: ""
};

// TODO: Should messages, files and users be in separate slice?
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<{ key: string; project: IProject }>) => {
      state.projects[action.payload.key].project = action.payload.project;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      delete state.projects[action.payload];
    },
    setSelectedProjectId: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
    setStageStatus: (state, action: PayloadAction<{ key: string; status: number }>) => {
      state.projects[action.payload.key].project.stageStatus = action.payload.status;
    },
    setStage: (state, action: PayloadAction<{ key: string; stage: number }>) => {
      state.projects[action.payload.key].project.stageStatus = action.payload.stage;
    },
    // Messages
    concatMessages: (state, action: PayloadAction<{ key: string; messages: IMessage[] }>) => {
      state.projects[action.payload.key].project.messages = state.projects[
        action.payload.key
      ].project.messages.concat(action.payload.messages);
    },
    addMessage: (state, action: PayloadAction<{ key: string; message: IMessage }>) => {
      state.projects[action.payload.key].project.messages.push(action.payload.message);
    },
    removeMessage: (state, action: PayloadAction<{ key: string; message: IMessage }>) => {
      const index = state.projects[action.payload.key].project.messages.indexOf(
        action.payload.message
      );
      if (index !== -1) {
        state.projects[action.payload.key].project.messages.splice(index);
      }
    },

    // Files
    concatFiles: (state, action: PayloadAction<{ key: string; files: IFile[] }>) => {
      state.projects[action.payload.key].project.files = state.projects[
        action.payload.key
      ].project.files.concat(action.payload.files);
    },
    addFiles: (state, action: PayloadAction<{ key: string; file: IFile }>) => {
      state.projects[action.payload.key].project.files.push(action.payload.file);
    },
    removeFiles: (state, action: PayloadAction<{ key: string; file: IFile }>) => {
      const index = state.projects[action.payload.key].project.files.indexOf(action.payload.file);
      if (index !== -1) {
        state.projects[action.payload.key].project.files.splice(index);
      }
    },

    // Users
    concatUsers: (state, action: PayloadAction<{ key: string; users: IUser[] }>) => {
      state.projects[action.payload.key].project.users = state.projects[
        action.payload.key
      ].project.users.concat(action.payload.users);
    },
    addUser: (state, action: PayloadAction<{ key: string; user: IUser }>) => {
      state.projects[action.payload.key].project.users.push(action.payload.user);
    },
    removeUser: (state, action: PayloadAction<{ key: string; user: IUser }>) => {
      const index = state.projects[action.payload.key].project.users.indexOf(action.payload.user);
      if (index !== -1) {
        state.projects[action.payload.key].project.messages.splice(index);
      }
    }
  }
});
export const {
  removeProject,
  setSelectedProjectId,
  addProject,
  concatFiles,
  removeFiles,
  removeUser,
  concatUsers,
  addUser,
  addMessage,
  removeMessage,
  addFiles,
  concatMessages,
  setStageStatus,
  setStage
} = projectSlice.actions;
export default projectSlice.reducer;
