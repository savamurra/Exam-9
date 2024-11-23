import { useEffect, useState} from "react";
import {ITransactionForm} from "../../types";
import {Button, MenuItem, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {getCategories, isClosedExpenseModal, openExpenseModal} from "../../store/slices/categorySlice.ts";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchCategory} from "../../store/thunks/categoryThunks.ts";
import {createTransaction, fetchTransactions} from "../../store/thunks/transactionThunks.ts";
import {isCreateLoading} from "../../store/slices/transactionSlice.ts";

const initialState = {
    name: '',
    type: '',
    amount: 0,
    created: '',
};

const TransactionForm = () => {
    const [form, setForm] = useState<ITransactionForm>(initialState);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getCategories);
    const isOpenModal = useAppSelector(openExpenseModal);
    const isCreate = useAppSelector(isCreateLoading);


    useEffect(() => {
        if (isOpenModal) {
            dispatch(fetchCategory());
        }
    }, [isOpenModal,dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedCategory = categories.find((category) => category.name === form.name && category.type === form.type);

        if (!selectedCategory) {
            return;
        }

        if (form.type.trim().length !== 0 && form.name.trim().length !== 0) {
            const newTransaction = {
                category: selectedCategory.id,
                amount: Number(form.amount),
                created: new Date().toISOString(),
                id: selectedCategory.id,
            };

            await dispatch(createTransaction(newTransaction));
            dispatch(isClosedExpenseModal());
            await dispatch(fetchTransactions());
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
                        Create
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
                                {[...new Set(categories.map((option) => option.type))].map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}

                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <TextField
                                sx={{width: "100%"}}
                                id="outlined-select-currency"
                                name="name"
                                select
                                label="Name"
                                value={form.name}
                                onChange={onChange}
                            >
                                {categories.filter(option => option.type === form.type).map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <TextField
                                sx={{width: "100%"}}
                                id="outlined-basic"
                                name="amount"
                                label="Amount"
                                variant='outlined'
                                type='number'
                                value={form.amount}
                                onChange={onChange}
                                InputProps={{
                                    inputProps: {
                                        min: 0
                                    }
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid size={8}>
                            <Button type='submit' variant="contained" sx={{width: "100%"}} disabled={isCreate}>
                                Create
                            </Button>
                        </Grid>
                        <Grid size={8}>
                            <Button variant="contained" sx={{width: "100%"}}
                                    onClick={() => dispatch(isClosedExpenseModal())}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </form>
    );
};

export default TransactionForm;