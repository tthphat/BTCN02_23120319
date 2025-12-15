import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function AddFavorites({ movieID }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const { token } = useAuth();

    useEffect(() => {
        let timer;
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false);
                setError(null);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    const addFavorite = async () => {
        try {
            setLoading(true);
            setError(null);
            setShowMessage(false);

            const response = await fetch(`${API_URL}/users/favorites/${movieID}`, {
                method: "POST",
                headers: {
                    "x-app-token": APP_TOKEN,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to add favorite");
            }

            const data = await response.json();
            console.log("Favorite added", data);

            setShowMessage(true);

        } catch (error) {
            setError(error);
            setShowMessage(true);
        } finally {
            setLoading(false);
        }
    }

    return (
       
    );
}

export default AddFavorites;