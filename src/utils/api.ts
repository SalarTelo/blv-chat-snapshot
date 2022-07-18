import axios from "axios";
import { ICompany, IFile, IMessage, IProject, IProperty, IUser } from "../types/types";
import config from "../../app.config";

const URL = `http://${config.host}:${config.api_port}/api/v1`;

const POST = async (endpoint: string, data: any) => {
  return axios.post(URL + endpoint, data);
};
const GET = async (endpoint: string, data: any) => {
  return axios.get(URL + endpoint, data);
};
const PUT = async (endpoint: string, data: any) => {
  return axios.put(URL + endpoint, data);
};
const DELETE = async (endpoint: string, data: any) => {
  return axios.delete(URL + endpoint, data);
};

export async function Login(username: string, password: string) {
  const data = await POST("/user/login", { username, password });
  return data.data;
}
export async function AddCompany(companyData: ICompany, userData: IUser) {
  const sendData = {
    name: companyData.name,
    orgNr: companyData.orgNr
  };
  const res = await POST("/company", sendData);
  await POST(`/company/${res.data.record.id}/user`, {
    userId: userData.id
  });
  return {
    ...res.data.record,
    properties: [],
    users: [userData]
  };
}
export async function AddProperty(propertyData: IProperty, companyData: ICompany) {
  const propertyResponse = await POST(`/property`, propertyData);
  await POST(`/company/${companyData.id}/property`, {
    propertyId: propertyResponse.data.record.id
  });
  return {
    ...propertyResponse.data.record,
    projects: [],
    companyId: companyData.id
  };
}
export async function AddProject(projectData: IProject, propertyData: IProperty, userData: IUser) {
  const projectResponse = await POST(`/project`, projectData);
  await POST(`/project/${projectResponse.data.record.id}/user`, {
    userId: userData.id
  });
  await POST(`/property/${propertyData.id}/project`, {
    projectId: projectResponse.data.record.id
  });
  return {
    ...projectResponse.data.record,
    propertyId: propertyData.id,
    users: [userData],
    messages: []
  };
}
export async function SendMessage(messageData: IMessage) {
  try {
    const res = await POST(`/project/${messageData.projectId}/message`, messageData);
    return {
      ...res.data.record,
      files: res.data.record.files ?? []
    };
  } catch (e) {
    console.log(e);
  }
}
export async function AddFileToProject(data: IFile) {
  const fileData = await POST(`/project/${data.projectId}/file`, data);
  return fileData.data.record;
}
