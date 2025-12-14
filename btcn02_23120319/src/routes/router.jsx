import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage.jsx";
import AppLayout from "@/layouts/AppLayout";
import Home from "@/pages/Home.jsx";
import RegisterPage from "@/pages/RegisterPage.jsx";
import MovieDetailPage from "@/pages/MovieDetailPage.jsx";
import User from "@/pages/User.jsx";

export const router = createBrowserRouter([
    {
        element: (
            <AppLayout />
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/movies/:id", element: <MovieDetailPage /> },
            { path: "/user", element: <User /> },
        ],
    },

    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
]);
