import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICategoryForm} from "../../types";
import axiosApi from "../../axiosAPI.tsx";

export const createCategory = createAsyncThunk<void, ICategoryForm>('category/createCategory', async (category: ICategoryForm) => {
    await axiosApi.post("categories.json", {...category});
});