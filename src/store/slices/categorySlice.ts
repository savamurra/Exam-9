import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICategory} from "../../types";
import {createCategory, deleteCategory, editCategory, fetchCategory} from "../thunks/categoryThunks.ts";
import {RootState} from "../../app/store.ts";

interface CategoryState {
    categories: ICategory[];
    selectedCategory: ICategory | null;
    isCreatedLoading: boolean;
    isOpenCategoryModal: boolean;
    isOpenExpenseModal: boolean;
    isFetchingLoading: boolean;
    isEditLoading: boolean;
    isDeleteLoading: boolean;
}

const initialState: CategoryState = {
    categories: [],
    selectedCategory: null,
    isCreatedLoading: false,
    isOpenCategoryModal: false,
    isOpenExpenseModal: false,
    isFetchingLoading: false,
    isEditLoading: false,
    isDeleteLoading: false,
};

export const openModals = (state: RootState) => state.category.isOpenCategoryModal;
export const openExpenseModal = (state: RootState) => state.category.isOpenExpenseModal
export const createLoading = (state: RootState) => state.category.isCreatedLoading;
export const getCategories = (state: RootState)=> state.category.categories;
export const selectedData = (state: RootState) => state.category.selectedCategory;
export const isEdit = (state: RootState) => state.category.isEditLoading;
export const isDelete = (state: RootState) => state.category.isDeleteLoading;

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        isOpenModal: (state) => {
            state.isOpenCategoryModal = true;
        },
        isCloseModal: (state) => {
            state.isOpenCategoryModal = false;
            state.selectedCategory = null;
        },
        getSelectedData: (state, action: PayloadAction<ICategory>) => {
            state.selectedCategory = action.payload;
        },
        isOpenedExpenseModal: (state) => {
            state.isOpenExpenseModal = true;
        },
        isClosedExpenseModal: (state) => {
            state.isOpenExpenseModal = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.isCreatedLoading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.isCreatedLoading = false;
            })
            .addCase(createCategory.rejected,(state) => {
                state.isCreatedLoading = false;
            })
            .addCase(fetchCategory.pending, (state) => {
                state.isFetchingLoading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
                state.categories = action.payload;
                state.isFetchingLoading = false;
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.isFetchingLoading = false;
            })
            .addCase(editCategory.pending, (state) => {
                state.isEditLoading = true;
            })
            .addCase(editCategory.fulfilled, (state) => {
                state.isEditLoading = false;
            })
            .addCase(editCategory.rejected,(state) => {
                state.isEditLoading = false;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isDeleteLoading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.isDeleteLoading = false;
            })
            .addCase(deleteCategory.rejected,(state) => {
                state.isDeleteLoading = false;
            });
    }
});

export const {isOpenModal,isCloseModal, getSelectedData, isOpenedExpenseModal, isClosedExpenseModal} = categorySlice.actions;