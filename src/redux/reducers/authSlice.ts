import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// TODO: Do we need more info or different types of tokens?
const initialState: { token: string } = {
  token: ""
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
