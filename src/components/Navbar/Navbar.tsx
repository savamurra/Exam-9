import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {isOpenedExpenseModal} from "../../store/slices/categorySlice.ts";


const Navbar = () => {
const dispatch = useAppDispatch();
    return (
        <>
            <Box sx={{flexGrow: 1, mb: 4}}>
                <AppBar position="static">
                    <Toolbar sx={{width: 1200, mx: "auto"}}>
                        <Typography
                            variant="h6"
                            component={NavLink}
                            to={'/'}
                            sx={{flexGrow: 1, textDecoration: "none", color: "white"}}
                        >
                            Finance Tracker
                        </Typography>
                        <Button color="inherit" component={NavLink} to='categories'>
                            Categories
                        </Button>
                        <Button color="inherit" onClick={() => dispatch(isOpenedExpenseModal())}>
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;
