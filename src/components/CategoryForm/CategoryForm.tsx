import {Button, MenuItem, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useCallback, useEffect, useState} from "react";
import {ICategoryForm} from "../../types";
import * as React from "react";
import {createCategory, editCategory, fetchCategory} from "../../store/thunks/categoryThunks.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    createLoading,
    isCloseModal, isEdit,
    openModals, selectedData,
} from "../../store/slices/categorySlice.ts";

const initialState = {
    name: '',
    type: '',
};

const CategoryForm = () => {
    const [form, setForm] = useState<ICategoryForm>(initialState);
    const dispatch = useAppDispatch();
    const isOpenModal = useAppSelector(openModals);
    const loading = useAppSelector(createLoading);
    const editLoading = useAppSelector(isEdit);
    const selected = useAppSelector(selectedData);

    const types = [
        {type: 'Income'},
        {type: 'Expense'},
    ];

    useEffect(() => {
        if (selected) {
            setForm(selected);
        } else {
            setForm(initialState);
        }
    }, [dispatch, selected]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const createCategories = useCallback(async (category: ICategoryForm) => {
        dispatch(createCategory(category));
    }, [dispatch]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selected) {
            await dispatch(editCategory({...selected, ...form}));
            dispatch(isCloseModal());
            await dispatch(fetchCategory());
        } else {
            if (form.type.trim().length !== 0 && form.name.trim().length !== 0) {
                await createCategories(form);
                dispatch(isCloseModal());
                await dispatch(fetchCategory());
            } else {
                alert('Заполните поля');
            }
        }
        setForm(initialState);
    };

    if (!isOpenModal) return null;

    return (
        <form onSubmit={onSubmit} style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: 50,
                    borderRadius: 8,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    width: 700,
                }}
            >

                <div>
                    <Typography variant="h4" sx={{flexGrow: 1, textAlign: "center"}}>
                        {selected ? 'Edit Category' : 'Create Category'}
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        sx={{mx: "auto", width: "100%", mt: 4, justifyContent: "center"}}
                    >
                        <Grid size={8}>
                            <TextField
                                sx={{width: "100%"}}
                                id="outlined-select-currency"
                                name="type"
                                select
                                label="Type"
                                value={form.type}
                                onChange={onChange}
                            >
                                {types.map((option) => (
                                    <MenuItem key={option.type} value={option.type}>
                                        {option.type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <TextField
                                sx={{width: "100%"}}
                                id="outlined-basic"
                                name="name"
                                label="Name"
                                variant='outlined'
                                value={form.name}
                                onChange={onChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <Button type='submit' variant="contained" sx={{width: "100%"}} disabled={loading || editLoading}>
                                {selected ? 'Edit' : 'Create'}
                            </Button>
                        </Grid>
                        <Grid size={8}>
                            <Button variant="contained" sx={{width: "100%"}} onClick={() => dispatch(isCloseModal())}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </form>

    )
        ;
};

export default CategoryForm;