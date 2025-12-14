import { useState, createContext, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (user) => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "x-app-token": APP_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    }

    const register = async (user) => {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                "x-app-token": APP_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Register failed");
        }

        setUser(data.user);
        setToken(data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, register, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export const useAuth = () => useContext(AuthContext);   