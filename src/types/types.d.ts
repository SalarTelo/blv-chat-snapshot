export interface IProperty {
  id: string;
  name: string;
  projects: IProject[];
}
export interface ICompany {
  id: string;
  name: string;
  orgNr: string;
  properties: IProperty[];
}
export interface IUser {
  id: string;
  name: string;
  profilePictureURL: string;
}
export interface IMessage {
  id: string;
  user: IUser;
  message: string;
  userId: string;
  projectId: string;
  createdAt: string;
}
export interface IProject {
  id: string;
  name: string;
  propertyId: string;
  users: IUser[];
  messages: IMessage[];
}
