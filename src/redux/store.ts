import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";

/// ///////////////////////////////////////////////////////////////////
// TODO: https://dev.to/link2twenty/react-redux-and-localstorage-2lih
//  This will help when trying to store stuff like token and account-data in store and LocalStorage
/// ///////////////////////////////////////////////////////////////////

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
