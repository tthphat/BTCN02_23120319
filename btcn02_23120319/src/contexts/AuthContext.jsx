import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logout = () => {
        setUser(null);
    };

    return (
        <>
            <AuthContext.Provider value={{ user, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export const useAuth = () => useContext(AuthContext);