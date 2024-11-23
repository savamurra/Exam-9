import CategoryForm from "../../components/CategoryForm/CategoryForm.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getCategories, isOpenModal} from "../../store/slices/categorySlice.ts";
import {useEffect} from "react";
import {fetchCategory} from "../../store/thunks/categoryThunks.ts";
import {NavLink} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Categories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(getCategories);

    useEffect(() => {
        dispatch(fetchCategory());
    },[dispatch]);

    const handleClick = () => {
        dispatch(isOpenModal());
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
                        >
                            <DeleteIcon />
                        </Button>
                        <Button
                            to="/contactForm"
                            component={NavLink}
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