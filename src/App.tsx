import Navbar from "./components/Navbar/Navbar.tsx";
import {Container} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import Categories from "./containers/Categories/Categories.tsx";

const App = () => {

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path='categories' element={<Categories />}/>
                </Routes>
            </Container>
        </>
    )
};

export default App
