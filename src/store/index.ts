import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import songSliceReducer from "./songSlice";

export const store = configureStore({
    reducer: { song: songSliceReducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
