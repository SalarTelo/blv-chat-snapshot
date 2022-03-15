interface IModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IProperty extends IModel {
  name: string;
  companyId: string;
  projects: IProject[];
}
export interface ICompany extends IModel {
  name: string;
  orgNr: string;
  properties: IProperty[];
  users: IUser[];
}
export interface IUser extends IModel {
  name: string;
  avatarURL: string;
}
export interface IMessage extends IModel {
  user: IUser;
  content: string;
  userId: string;
  type: number;
  projectId: string;
}
export interface IFile extends IModel {
  name: string;
  senderId: string;
  projectId: string;
  size: number;
  url: string;
}
export interface IHistory extends IModel {
  type: number;
  displayId: number;
  senderId: string;
  projectId: string;
  isNotifiable: boolean;
  hasNotified: boolean;
  notifiedUsers: IUser[];
}
export interface IProject extends IModel {
  name: string;
  propertyId: string;
  stage: number;

  stageStatus: number;
  users: IUser[];
  messages: IMessage[];
  history: IHistory[];
  files: IFile[];

  // TODO: These could be in a order table actually. But we'll keep it here for now.
  description: string;
  custom_request: string;
  building_permit: boolean;
  construction: boolean;
  dimensional_cert: boolean;
  energy_calculation: boolean;
  fire_doc: boolean;
  k_doc: boolean;
  ka: boolean;
  moisture_safety_description: boolean;
  rendering: boolean;
  u_value: boolean;
  va: boolean;
  vvs: boolean;
}
export interface IOrder extends IModel {}
