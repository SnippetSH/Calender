import { configureStore } from "@reduxjs/toolkit";
import { renderDate } from "./datesInform";


const store = configureStore({
    reducer : {
        renderDate: renderDate.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;