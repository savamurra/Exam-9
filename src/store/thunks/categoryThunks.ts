import {createAsyncThunk} from "@reduxjs/toolkit";
import {CategoryList, ICategory, ICategoryForm} from "../../types";
import axiosApi from "../../axiosAPI.tsx";

export const createCategory = createAsyncThunk<void, ICategoryForm>('category/createCategory', async (category: ICategoryForm) => {
    await axiosApi.post("categories.json", {...category});
});

export const fetchCategory = createAsyncThunk<ICategory[], void>(
    "category/fetchCategory", async () => {
        const response: { data: CategoryList | null } = await axiosApi.get("categories.json");
        const categoryList = response.data;

        if (categoryList === null) {
            return [];
        }

        const category: CategoryList = categoryList;
        return Object.keys(categoryList).map((item) => {
            return {
                ...category[item],
                id: item,
            };
        });
    },
);

export const editCategory = createAsyncThunk<void, ICategory>('category/editCategory', async (category) => {
    const {id, ...data} = category;
    await axiosApi.put(`categories/${id}.json`, data);
});

export const deleteCategory = createAsyncThunk<void, string>('category/deleteCategory', async (id: string) => {
    await axiosApi.delete(`categories/${id}.json`);
});
