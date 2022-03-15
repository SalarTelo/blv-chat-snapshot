import {
  ADD_COMPANY,
  ADD_MESSAGE,
  ADD_PROJECT,
  ADD_PROPERTY,
  REMOVE_COMPANY,
  REMOVE_MESSAGE,
  REMOVE_PROJECT,
  REMOVE_PROPERTY,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY,
  SET_INIT_DATA,
  ADD_HISTORY,
  REMOVE_HISTORY,
  ADD_USER,
  REMOVE_USER,
  SET_SELECTED_COMPANY,
  REMOVE_FILE,
  ADD_FILE,
  SET_OVERLAY_STATE
} from "../action-types";
import { ICompany, IFile, IHistory, IMessage, IProject, IProperty, IUser } from "../../types/types";

// TODO: MAJOR! NEED TO SEPARATE ALL OF THESE IN TO THEIR OWN REDUCERS AND SET UP A PROPER ACTION SYSTEM

type AppData = {
  userData: IUser;
  projects: IProject[];
  companies: ICompany[];
  properties: IProperty[];
  histories: IHistory[];
  files: IFile[];
  users: IUser[];

  selectedProjectId: string;
  selectedPropertyId: string;
  selectedCompanyId: string;

  // TODO: figure out if this should be a state or if there is a better way to handle overlays
  // Right now it's:
  // 0 = disabled
  // 1 = Add Company
  // 2 = Add Property
  // 3 = Add Project
  overlayState: number;
};
interface SetOverlayStateAction {
  type: string;
  payload: number;
}
interface AddUserAction {
  type: string;
  payload: IUser;
}
interface RemoveUserAction {
  type: string;
  payload: IUser;
}
interface AddMessageAction {
  type: string;
  payload: IMessage;
}
interface RemoveMessageAction {
  type: string;
  payload: IMessage;
}
interface SetSelectedProjectAction {
  type: string;
  payload: IProject;
}
interface AddProjectAction {
  type: string;
  payload: IProject;
}
interface RemoveProjectAction {
  type: string;
  payload: IProject;
}
interface AddPropertyAction {
  type: string;
  payload: IProperty;
}
interface RemovePropertyAction {
  type: string;
  payload: IProperty;
}
interface AddCompanyAction {
  type: string;
  payload: ICompany;
}
interface RemoveCompanyAction {
  type: string;
  payload: ICompany;
}
interface AddHistoryAction {
  type: string;
  payload: IHistory;
}
interface RemoveHistoryAction {
  type: string;
  payload: IHistory;
}
interface AddFileAction {
  type: string;
  payload: IFile;
}
interface RemoveFileAction {
  type: string;
  payload: IFile;
}
interface SetInitDataAction {
  type: string;
  payload: {
    userData: IUser;

    projects: IProject[];
    companies: ICompany[];
    properties: IProperty[];
    users: IUser[];
    files: IFile[];
    histories: IHistory[];
  };
}
type Action =
  | SetOverlayStateAction
  | AddUserAction
  | RemoveUserAction
  | AddFileAction
  | RemoveFileAction
  | AddHistoryAction
  | RemoveHistoryAction
  | AddMessageAction
  | RemoveMessageAction
  | SetSelectedProjectAction
  | AddProjectAction
  | RemoveProjectAction
  | AddPropertyAction
  | RemovePropertyAction
  | AddCompanyAction
  | RemoveCompanyAction
  | SetInitDataAction;

const initialState: AppData = {
  userData: {
    id: "",
    name: ""
  },
  histories: [],
  companies: [],
  properties: [],
  projects: [],
  files: [],
  users: [],
  selectedProjectId: "",
  selectedPropertyId: "",
  selectedCompanyId: "",
  overlayState: 0
};

const appReducer = (state: AppData = initialState, action: Action) => {

  if (action.type === SET_INIT_DATA) {
    return {
      ...state,
      userData: action.payload.userData,
      projects: action.payload.projects,
      properties: action.payload.properties,
      companies: action.payload.companies,
      histories: action.payload.histories,
      files: action.payload.files,
      users: action.payload.users
    };
  }
  if (action.type === SET_SELECTED_COMPANY) {
    return {
      ...state,
      selectedCompanyId: action.payload.id
    };
  }
  if (action.type === SET_OVERLAY_STATE) {
    return {
      ...state,
      overlayState: action.payload
    };
  }
  if (action.type === SET_SELECTED_PROJECT) {
    return {
      ...state,
      selectedProjectId: action.payload.id
    };
  }
  if (action.type === SET_SELECTED_PROPERTY) {
    return {
      ...state,
      selectedPropertyId: action.payload.id
    };
  }
  if (action.type === ADD_FILE) {
    return {
      ...state,
      files: [...state.files, action.payload]
    };
  }
  if (action.type === REMOVE_FILE) {
    return {
      ...state,
      files: state.files.filter((file: IFile) => file.id !== action.payload.id)
    };
  }
  if (action.type === ADD_USER) {
    return {
      ...state,
      users: [...state.users, action.payload]
    };
  }
  if (action.type === REMOVE_USER) {
    return {
      ...state,
      users: state.users.filter((user: IUser) => user.id !== action.payload.id)
    };
  }
  if (action.type === ADD_MESSAGE) {
    return {
      ...state,
      projects: state.projects.map((project: IProject) => {
        if(project.id === action.payload.projectId) {
          return {
            ...project,
            messages: [...project.messages, action.payload]
          };
        }
        return project;
      })
    };
  }
  if (action.type === REMOVE_MESSAGE) {
    return {
      ...state,
      projects: state.projects.map((project: IProject) => {
        return {
          ...project,
          messages: project.messages.filter((message: IMessage) => message.id !== action.payload.id)
        };
      })
    };
  }

  if (action.type === ADD_HISTORY) {
    return {
      ...state,
      histories: [...state.histories, action.payload]
    };
  }
  if (action.type === REMOVE_HISTORY) {
    return {
      ...state,
      histories: state.histories.filter((history: IHistory) => history.id !== action.payload.id)
    };
  }

  if (action.type === ADD_PROJECT) {
    return {
      ...state,
      projects: [...state.projects, action.payload]
    };
  }
  if (action.type === REMOVE_PROJECT) {
    return {
      ...state,
      projects: state.projects.filter((project: IProject) => project.id !== action.payload.id)
    };
  }

  if (action.type === ADD_PROPERTY) {
    return {
      ...state,
      properties: [...state.properties, action.payload]
    };
  }
  if (action.type === REMOVE_PROPERTY) {
    return {
      ...state,
      properties: state.properties.filter(
        (property: IProperty) => property.id !== action.payload.id
      )
    };
  }

  if (action.type === ADD_COMPANY) {
    return {
      ...state,
      companies: [...state.companies, action.payload]
    };
  }
  if (action.type === REMOVE_COMPANY) {
    return {
      ...state,
      companies: state.companies.filter((company: ICompany) => company.id !== action.payload.id)
    };
  }
  return state;
};
export default appReducer;
