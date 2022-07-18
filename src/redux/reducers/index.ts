import { combineReducers } from "redux";
import appReducer from "./appReducer";
import accountSlice from "./accountSlice";
import authSlice from "./authSlice";
import projectSlice from "./KV-Slices/projectSlice";
import companySlice from "./KV-Slices/companySlice";
import propertySlice from "./KV-Slices/propertySlice";

const reducers = combineReducers({
  app: appReducer,
  accountStore: accountSlice,
  authStore: authSlice,
  projectStore: projectSlice,
  companyStore: companySlice,
  propertyStore: propertySlice
});
export default reducers;
