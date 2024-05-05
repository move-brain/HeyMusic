import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index.js";

const userInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState: {
        name: "",
        avatar: "",
    },
    reducers: {
        changeInfo: (state, action) => {
            console.log(state);

            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
        },
    },
});
export const { changeInfo } = userInfoSlice.actions;
export const selectUserIfo = (state: RootState) => state.userInfo;
export default userInfoSlice.reducer;
