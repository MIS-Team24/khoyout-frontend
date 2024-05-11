import { API_User } from "@/API/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: userData | null;
};

export type userData = {
  user: API_User;
  otp: {
    keyVal: string;
  };
};

const InitialState: UserState = {
  user: null,
};

const mainStateReducer = createSlice({
  name: "users",
  initialState: InitialState,
  reducers: {
    stateSetNewAuthUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      return state;
    },
  },
});

export const { stateSetNewAuthUser } = mainStateReducer.actions;

export default mainStateReducer.reducer;
