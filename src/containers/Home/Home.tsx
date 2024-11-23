import {Box, Button, Typography} from "@mui/material";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteTransaction, fetchTransactions} from "../../store/thunks/transactionThunks.ts";
import {getTransactions, isDeleteTransaction} from "../../store/slices/transactionSlice.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from 'dayjs';
import TransactionForm from "../../components/TransactionForm/TransactionForm.tsx";
import {getCategories} from "../../store/slices/categorySlice.ts";
import {fetchCategory} from "../../store/thunks/categoryThunks.ts";


const Home = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getCategories);
    const transactions = useAppSelector(getTransactions);
    const isDeleteLoading = useAppSelector(isDeleteTransaction);

    const total = transactions.reduce((acc, transactions) => {
        acc += transactions.amount;
        return acc;
    }, 0);

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteTransaction(id));
        await dispatch(fetchTransactions());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            dispatch(fetchTransactions());
        }
    }, [dispatch, categories]);


    return (
        <div>
            <Box sx={{
                padding: 2, margin: '20px auto', border: "3px solid DodgerBlue",
                borderRadius: 4, width: 400,
            }}>
                <Typography sx={{fontSize: 20, fontWeight: 700}}>
                    Total : {total}
                </Typography>
            </Box>
            {transactions.map((transaction) => (
                <Box key={transaction.id} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-between',
                    margin: 'auto',
                    border: "3px solid DodgerBlue",
                    borderRadius: 4,
                    width: 1000,
                    padding: 1,
                    marginBottom: 2,
                }}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography>{dayjs(transaction.created).format('DD.MM.YYYY HH:mm:ss')}</Typography>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography>{transaction.category}</Typography>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography sx={{
                            marginRight: 5,
                        }}>{transaction.amount}</Typography>
                        <Button
                            onClick={() => onDelete(transaction.id)}
                            disabled={isDeleteLoading}
                        >
                            <DeleteIcon/>
                        </Button>
                        <Button
                        >
                            <EditIcon style={{marginRight: 8}}/>
                        </Button>
                    </div>
                </Box>
            ))}
            <TransactionForm/>
        </div>
    );
};

export default Home;