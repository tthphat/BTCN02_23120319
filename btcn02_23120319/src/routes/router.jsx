import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/LoginPage.jsx";
import AppLayout from "@/layouts/AppLayout";


export const router = createBrowserRouter([
    {
        element: (
            <AppLayout />
        ),
        children: [

        ],
    },

    { path: "/login", element: <LoginPage /> },
]);
