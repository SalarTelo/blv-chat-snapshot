import {
  ADD_COMPANY,
  ADD_MESSAGE_TO_SELECTED_PROJECT,
  ADD_PROJECT,
  ADD_PROPERTY,
  REMOVE_COMPANY,
  REMOVE_MESSAGE_FROM_SELECTED_PROJECT,
  REMOVE_PROJECT,
  REMOVE_PROPERTY,
  SET_CURRENT_COMPANY,
  SET_SELECTED_PROJECT,
  SET_SELECTED_PROPERTY,
  SET_INIT_DATA,
  UPDATE_CURRENT_PROJECT
} from "../action-types";
import { ICompany, IMessage, IProject, IProperty, IUser } from "../../types/types";

type AppData = {
  userData: IUser;

  projectList: IProject[];
  companyList: ICompany[];
  propertyList: IProperty[];

  selectedProjectId: string;
  selectedPropertyId: string;
};
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
interface SetInitDataAction {
  type: string;
  payload: {
    userData: IUser;

    projectList: IProject[];
    companyList: ICompany[];
    propertyList: IProperty[];
  };
}
type Action =
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
  companyList: [],
  propertyList: [],
  projectList: [],
  selectedProjectId: "",
  selectedPropertyId: ""
};

const appReducer = (state: AppData = initialState, action: Action) => {
  if (action.type === SET_INIT_DATA) {
    return {
      ...state,
      userData: action.payload.userData,
      projectList: action.payload.projectList,
      propertyList: action.payload.propertyList,
      companyList: action.payload.companyList
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

  if (action.type === ADD_MESSAGE_TO_SELECTED_PROJECT) {
    return {
      ...state,
      projectList: state.projectList.map((project) => {
        return {
          ...project,
          messages: [...project.messages, action.payload]
        };
      })
    };
  }
  if (action.type === REMOVE_MESSAGE_FROM_SELECTED_PROJECT) {
    return {
      ...state,
      projectList: state.projectList.map((project) => {
        return {
          ...project,
          messages: project.messages.filter((message) => message.id !== action.payload.id)
        };
      })
    };
  }
  if (action.type === ADD_PROJECT) {
    return {
      ...state,
      projectList: [...state.projectList, action.payload]
    };
  }
  if (action.type === REMOVE_PROJECT) {
    return {
      ...state,
      projectList: state.projectList.filter((project) => project.id !== action.payload.id)
    };
  }
  if (action.type === ADD_PROPERTY) {
    return {
      ...state,
      projectList: [...state.projectList, action.payload]
    };
  }
  if (action.type === REMOVE_PROPERTY) {
    return {
      ...state,
      projectList: state.projectList.filter((project) => project.id !== action.payload.id)
    };
  }
  if (action.type === ADD_COMPANY) {
    return {
      ...state,
      companyList: [...state.companyList, action.payload]
    };
  }
  if (action.type === REMOVE_COMPANY) {
    return {
      ...state,
      companyList: state.companyList.filter((company) => company.id !== action.payload.id)
    };
  }
  return state;
};
export default appReducer;
