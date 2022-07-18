import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type props = { id: string; avatarURL: string; displayName: string; username: string };
const initialState: props = {
  id: "",
  avatarURL: "",
  displayName: "",
  username: ""
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // TODO: Is there a better way to do this? I get ESLint errors when I do (state = action.payload).
    setAccount: (state, action: PayloadAction<props>) => {
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
      state.username = action.payload.username;
      state.avatarURL = action.payload.displayName;
    },
    setAvatarURL: (state, action: PayloadAction<string>) => {
      state.avatarURL = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    }
  }
});
export const { setDisplayName, setUsername, setAvatarURL, setAccount } = accountSlice.actions;
export default accountSlice.reducer;
