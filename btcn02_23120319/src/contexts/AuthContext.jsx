import { useState, useEffect, createContext, useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // hàm load localStrorage 
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to restore auth from localStorage", err);
    }
  }, []);

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

    console.log("Login success", data);
  };

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

    console.log("Register success", data);
  };

  const logout = async () => {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      headers: {
        "x-app-token": APP_TOKEN,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Logout failed");
    }

    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    console.log(data);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ user, setUser, token, login, register, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export const useAuth = () => useContext(AuthContext);
