import {createSlice} from "@reduxjs/toolkit";
import {Category} from "../../types";
import {createCategory} from "../thunks/categoryThunks.ts";

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
}

const initialState: CategoryState = {
    categories: [],
    isLoading: false
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCategory.pending, state => {
            state.isLoading = true;
        });
    }
});