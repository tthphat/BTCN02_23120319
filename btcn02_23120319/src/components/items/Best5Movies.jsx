import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function Best5Movie() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getBest5Movie = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/movies/most-popular?page=1&limit=5`, {
                headers: {
                    "x-app-token": APP_TOKEN,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch best 5 movie");
            }
            const data = await response.json();
            setMovies(data.data);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { getBest5Movie() }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full row-start-1 px-30 relative">
            <Carousel className="w-full h-full relative">
                <CarouselContent className="w-full h-full">
                    {movies.map(movie => (
                        <CarouselItem
                            key={movie.id}
                            className="basis-full h-full flex justify-center items-center"
                        >
                            <Card
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                className="w-full max-w-xs aspect-[2/3] relative overflow-hidden border-0 rounded-xl shadow-lg cursor-pointer"
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />

                                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">
                                        {movie.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm opacity-90">
                                        <span className="flex items-center gap-1 bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-400">
                                            ★ {movie.rate}
                                        </span>
                                        <span>{movie.year}</span>
                                    </div>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}

export default Best5Movie;  
