import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage.jsx";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";

export const router = createBrowserRouter([
    {
        element: (
            <AppLayout />
        ),
        children: [
            { path: "/", element: <Home /> },
        ],
    },

    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
]);
