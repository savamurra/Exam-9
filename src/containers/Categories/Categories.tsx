import CategoryForm from "../../components/CategoryForm/CategoryForm.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getCategories, getSelectedData, isDelete, isOpenModal} from "../../store/slices/categorySlice.ts";
import {useCallback, useEffect} from "react";
import {deleteCategory, fetchCategory} from "../../store/thunks/categoryThunks.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {ICategory} from "../../types";

const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getCategories);
    const deleteLoading = useAppSelector(isDelete);

    const onDelete = useCallback(async (id: string) => {
        await dispatch(deleteCategory(id));
        await dispatch(fetchCategory());
    },[dispatch]);

    useEffect(() => {
        dispatch(fetchCategory());
    },[dispatch]);

    const handleClick = () => {
        dispatch(isOpenModal());
    };

    const handleEditClick = (category: ICategory) => {
        dispatch(isOpenModal());
        dispatch(getSelectedData(category));
    };



    return (
        <div>
            <CategoryForm/>
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: 'space-between',
                borderBottom: '2px solid DodgerBlue',
                marginBottom: 2
            }}>
                <Typography variant='h5'>Categories</Typography>
                <Button onClick={() => handleClick()}>Add</Button>
            </Box>
            {categories.map((category) => (
                <Box key={category.id} sx={{
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
                        <Typography>{category.name}</Typography>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography sx={{marginRight: 5, color: category.type === "Income" ? "green" : "red"}}>{category.type}</Typography>
                        <Button
                            onClick={() => onDelete(category.id)}
                            disabled={deleteLoading}
                        >
                            <DeleteIcon />
                        </Button>
                        <Button
                            onClick={() =>  handleEditClick(category)}
                        >
                            <EditIcon style={{ marginRight: 8 }} />
                        </Button>
                    </div>
                </Box>
            ))}
        </div>
    );
};

export default Categories;