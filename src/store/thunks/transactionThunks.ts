import {createAsyncThunk} from "@reduxjs/toolkit";
import { TransactionList, TransactionType} from "../../types";
import axiosApi from "../../axiosAPI.tsx";
import {RootState} from "../../app/store.ts";

export const createTransaction = createAsyncThunk<void, TransactionType>('transaction/createTransaction', async (transaction: TransactionType) => {
    await axiosApi.post("transactions.json", {...transaction});
});

export const fetchTransactions = createAsyncThunk<TransactionType[], void, {state: RootState}>(
    "category/fetchTransactions", async (_arg, thunkAPI) => {
        const response: { data: TransactionList | null } = await axiosApi.get("transactions.json");
        const transactionList = response.data;

        if (transactionList === null) {
            return [];
        }

        const state = thunkAPI.getState().category.categories;

        const transaction: TransactionList = transactionList;
        return Object.keys(transactionList).map((item) => {
            const oneTransaction = transaction[item];
            const categoryId = state.find((category) => category.id === oneTransaction.category);
            return {
                ...oneTransaction,
                category: categoryId ? categoryId.name : "",
                id: item,
            };
        });
    },
);

export const deleteTransaction = createAsyncThunk<void, string>('transaction/deleteTransaction', async (id: string) => {
    await axiosApi.delete(`transactions/${id}.json`);
});