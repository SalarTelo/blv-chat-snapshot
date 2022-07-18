import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompany } from "../../../types/types";

type props = {
  companies: { [key: string]: ICompany };
  selectedCompanyId: string;
};
const initialState: props = {
  companies: {},
  selectedCompanyId: ""
};
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<{ key: string; company: ICompany }>) => {
      state.companies[action.payload.key] = action.payload.company;
    },
    removeCompany: (state, action: PayloadAction<string>) => {
      delete state.companies[action.payload];
    },
    setSelectedCompanyId: (state, action: PayloadAction<string>) => {
      state.selectedCompanyId = action.payload;
    }
  }
});
export const { removeCompany, setSelectedCompanyId, addCompany } = companySlice.actions;
export default companySlice.reducer;
