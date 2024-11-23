import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TransactionType} from "../../types";
import {createTransaction, deleteTransaction, fetchTransactions} from "../thunks/transactionThunks.ts";
import {RootState} from "../../app/store.ts";

interface TransactionState {
    transactions: TransactionType[],
    isCreateLoading: boolean,
    isLoading: boolean,
    isDeleteLoading: boolean,
}

const initialState: TransactionState = {
    transactions: [],
    isCreateLoading: false,
    isLoading: false,
    isDeleteLoading: false
};

export const getTransactions = (state: RootState) => state.transaction.transactions;
export const isCreateLoading = (state: RootState) => state.transaction.isCreateLoading;
export const isLoading = (state: RootState) => state.transaction.isLoading;
export const isDeleteTransaction = (state: RootState) => state.transaction.isDeleteLoading;

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.isCreateLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state) => {
                state.isCreateLoading = false;
            })
            .addCase(createTransaction.rejected, (state) => {
                state.isCreateLoading = false;
            })
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<TransactionType[]>) => {
                state.transactions = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchTransactions.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deleteTransaction.fulfilled, (state) => {
                state.isDeleteLoading = false;
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.isDeleteLoading = false;
            });


    }
});