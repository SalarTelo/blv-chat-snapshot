import axios from "axios";
import { ICompany, IMessage, IProject, IProperty, IUser } from "../types/types";

const URL = "http://localhost:5545/api/v1";

export async function AddCompany(companyData: ICompany, userData: IUser) {
  const sendData = {
    name: companyData.name,
    orgNr: companyData.orgNr
  };
  const res = await axios.post(`${URL}/company`, sendData);
  await axios.post(`${URL}/company/${res.data.record.id}/user`, {
    userId: userData.id
  });
  return {
    ...res.data.record,
    properties: [],
    users: [userData]
  };
}
export async function AddProperty(propertyData: IProperty, companyData: ICompany) {
  const propertyResponse = await axios.post(`${URL}/property`, propertyData);
  await axios.post(`${URL}/company/${companyData.id}/property`, {
    propertyId: propertyResponse.data.record.id
  });
  return {
    ...propertyResponse.data.record,
    projects: [],
    companyId: companyData.id
  };
}
export async function AddProject(projectData: IProject, propertyData: IProperty, userData: IUser) {
  const projectResponse = await axios.post(`${URL}/project`, projectData);
  await axios.post(`${URL}/project/${projectResponse.data.record.id}/user`, {
    userId: userData.id
  });
  await axios.post(`${URL}/property/${propertyData.id}/project`, {
    projectId: projectResponse.data.record.id
  });
  return {
    ...projectResponse.data.record,
    propertyId: propertyData.id,
    users: [userData],
    messages: []
  };
}
export async function SendMessage(messageData: IMessage, projectId: string) {
  return axios.post(`${URL}/project/${projectId}/message`, messageData);
}
