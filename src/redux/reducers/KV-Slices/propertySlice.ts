import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProperty } from "../../../types/types";

type props = {
  property: { [key: string]: IProperty };
  selectedPropertyId: string;
};

const initialState: props = {
  property: {},
  selectedPropertyId: ""
};
const companySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    addProperty: (state, action: PayloadAction<{ key: string; property: IProperty }>) => {
      state.property[action.payload.key] = action.payload.property;
    },
    removeProperty: (state, action: PayloadAction<string>) => {
      delete state.property[action.payload];
    },
    setSelectedPropertyId: (state, action: PayloadAction<string>) => {
      state.selectedPropertyId = action.payload;
    }
  }
});
export const { removeProperty, setSelectedPropertyId, addProperty } = companySlice.actions;
export default companySlice.reducer;
