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

const API_URL = import.meta.env.VITE_API_URL
const APP_TOKEN = import.meta.env.VITE_APP_TOKEN

function PopularMovies() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    return (
        <div className="w-full h-full row-start-2 px-30 relative">
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                }}
                className="w-full h-full relative"
            >
                <CarouselContent className="w-full h-full">
                    {movies.map(movie => (
                        <CarouselItem
                            key={movie.id}
                            className="basis-1/3 h-full flex justify-center items-center"
                        >
                            <Card
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                className="w-full max-w-[300px] aspect-[2/3] relative overflow-hidden border-0 rounded-xl shadow-lg cursor-pointer"
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
                                        <span>Rate: {movie.rate}</span>
                                        <span>Year: {movie.year}</span>
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

export default PopularMovies;  
