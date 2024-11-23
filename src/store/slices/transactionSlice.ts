import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TransactionType} from "../../types";
import {createTransaction, fetchTransactions} from "../thunks/transactionThunks.ts";

interface TransactionState {
   transactions: TransactionType[],
   isCreateLoading: boolean,
   isLoading: boolean,
}

const initialState: TransactionState = {
   transactions: [],
   isCreateLoading: false,
   isLoading: false,
};

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
             state.isLoading = false;
             state.transactions = action.payload;
          })
          .addCase(fetchTransactions.rejected, (state) => {
             state.isLoading = false;
          });

   }
});