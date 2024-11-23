import {configureStore} from "@reduxjs/toolkit";
import {categorySlice} from "../store/slices/categorySlice.ts";
import {transactionSlice} from "../store/slices/transactionSlice.ts";

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        transaction: transactionSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;