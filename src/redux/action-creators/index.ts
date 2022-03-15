import { Dispatch } from "redux";
import { ICompany, IMessage, IProject, IProperty } from "../../types/types";

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
  SET_INIT_DATA
} from "../action-types";

export const setAppData = (user: any) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_INIT_DATA,
      payload: user
    });
  };
};
export const setSelectedProject = (project: IProject) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SELECTED_PROJECT,
      payload: project
    });
  };
};
export const addMessage = (message: IMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message
    });
  };
};
export const removeMessage = (message: IMessage) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_MESSAGE,
      payload: message
    });
  };
};

export const addProperty = (property: IProperty) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_PROPERTY,
      payload: property
    });
  };
};

export const removeProperty = (property: IProperty) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_PROPERTY,
      payload: property
    });
  };
};

export const addCompany = (company: ICompany) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_COMPANY,
      payload: company
    });
  };
};

export const removeCompany = (company: ICompany) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_COMPANY,
      payload: company
    });
  };
};

export const addProject = (project: IProject) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ADD_PROJECT,
      payload: project
    });
  };
};

export const removeProject = (project: IProject) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: REMOVE_PROJECT,
      payload: project
    });
  };
};
