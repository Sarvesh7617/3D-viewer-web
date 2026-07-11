import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"


const router = createBrowserRouter(

        createRoutesFromElements(

            <Route element={<App/>}>


                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


            </Route>

        )
    );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
