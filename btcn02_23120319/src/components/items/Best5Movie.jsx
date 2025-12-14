import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function Best5Movie() {
    const [movies, setMovies] = useState([]);

    const getBest5Movie = async () => {
        try {
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
        }
    }

    useEffect(() => { getBest5Movie() }, []);

    return (
        <div className="w-full h-full row-start-1 px-50 relative group">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full h-full flex justify-center items-center"
            >
                <CarouselContent className="w-full h-full">
                    {movies.length > 0 && movies.map((movie) => (
                        <CarouselItem key={movie.id} className="w-[50px] h-full">
                            <div className="h-full">
                                <Card className="w-full h-full relative overflow-hidden group border-0 rounded-lg shadow-lg p-0">
                                    <div className="w-full h-full relative">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                            <h3 className="text-lg font-bold line-clamp-1 mb-1" title={movie.title}>
                                                {movie.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm font-medium">
                                                <div className="flex items-center gap-1.5 opacity-90">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{movie.year}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-yellow-500 font-bold bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span>{movie.rate}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
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
