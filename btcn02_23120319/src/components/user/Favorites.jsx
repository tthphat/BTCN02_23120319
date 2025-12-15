import PaginationSection from "@/components/PaginationSection";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function Favorites() {
    const { token } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const pageSize = 9;

    const getFavorites = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/users/favorites`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch favorites");
            }

            const data = await response.json();

            if (data.length === 0) {
                setFavorites([]);
                setTotalPages(1);
            } else {
                setFavorites(data);
                setTotalPages(Math.ceil(data.length / pageSize));
            }

            console.log("Favorites", data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
            <p>List of favorite movies will appear here.</p>
            <PaginationSection />
        </div>
    );
}

export default Favorites;
