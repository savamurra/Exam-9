import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <CssBaseline/>
            <App />
        </Provider>
    </BrowserRouter>
)
