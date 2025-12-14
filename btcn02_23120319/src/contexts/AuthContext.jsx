import { useState, createContext, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = async (user) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "x-app-token": APP_TOKEN,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Username or password is incorrect");
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    }

    const register = async (user) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: {
                    "x-app-token": APP_TOKEN,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Username or password is incorrect");
            }

            const data = await response.json();
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
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