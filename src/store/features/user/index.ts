import { API_User } from "@/API/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: API_User | null;
};

const InitialState: UserState = {
  user: null,
};

const mainStateReducer = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    stateSetNewAuthUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
  },
});

export const { stateSetNewAuthUser } = mainStateReducer.actions;

export default mainStateReducer.reducer;
