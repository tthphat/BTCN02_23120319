import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Play, Calendar, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL;
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN;

function MovieDetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovieDetail = async () => {
        try {
            const response = await fetch(`${API_URL}/movies/${id}`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch movie detail");
            }
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (id) {
            fetchMovieDetail();
        }
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!movie) return <div className="text-center py-10">Movie not found</div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold">Movie Detail Page</h1>
            <p className="mt-4">Movie ID: {id}</p>
        </div>
    );
}

export default MovieDetailPage;
