import {Button, MenuItem, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useCallback, useState} from "react";
import {ICategoryForm} from "../../types";
import * as React from "react";
import {createCategory} from "../../store/thunks/categoryThunks.ts";
import {useAppDispatch} from "../../app/hooks.ts";

const initialState = {
    name: '',
    type: '',
};

const CategoryForm = () => {
    const [form, setForm] = useState<ICategoryForm>(initialState);
    const dispatch = useAppDispatch();

    const categories = [
        {category: 'Food'},
        {category: 'Cinema'},
        {category: 'Gym'},
        {category: 'Restaurants'},
        {category: 'Clothes'},
    ];
    const types = [
        {type: 'Income'},
        {type: 'Expense'},
    ];

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
        await createCategories(form);
        setForm(initialState);
    };

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
                        Create Category
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        sx={{mx: "auto", width: "100%", mt: 4, justifyContent: "center"}}
                    >
                        <Grid size={8}>
                            <TextField
                                sx={{ width: "100%" }}
                                id="outlined-select-currency"
                                name="name"
                                select
                                label="Name"
                                value={form.name}
                                onChange={onChange}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option.category} value={option.category}>
                                        {option.category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <TextField
                                sx={{ width: "100%" }}
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
                            <Button type='submit' variant="contained" sx={{width: "100%"}} onClick={() => {}}>
                                Create
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