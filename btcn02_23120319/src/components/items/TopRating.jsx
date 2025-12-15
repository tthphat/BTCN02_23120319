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


function TopRating() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const getTopRatingMovies = async () => {
        try {
            // Fetch page 1, 2, 3 sau đó gộp lại thành 1 mảng mới đủ 30 phim
            const promises = [1, 2, 3].map(page =>
                fetch(`${API_URL}/movies/top-rated?category=IMDB_TOP_50&page=${page}&limit=10`, {
                    headers: {
                        "x-app-token": APP_TOKEN,
                    },
                }).then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch top-rated movies page ${page}`);
                    return res.json();
                })
            );

            const results = await Promise.all(promises);
            // Gộp mảng
            const allMovies = results.flatMap(data => data.data);
            setMovies(allMovies);
            console.log("Fetched movies:", allMovies);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { getPopularMovies() }, []);

    return (
        <div className="w-full h-full row-start-2 px-16 relative overflow-hidden flex flex-col">
            <h2 className="text-2xl font-bold border-l-4 border-lime-400 pl-4 mb-6">Top Rating</h2>
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 3,
                }}
                className="w-full flex-1 relative"
            >
                <CarouselContent className="w-full h-full">
                    {movies.map(movie => (
                        <CarouselItem
                            key={movie.id}
                            className="basis-1/3 h-full flex justify-center items-center py-4"
                        >
                            <Card
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                className="w-full max-w-[300px] aspect-[2/3] relative overflow-hidden border-0 rounded-xl shadow-lg cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10"
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute bottom-0 left-0 w-full p-4 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <h3 className="text-xl font-bold mb-1 line-clamp-2 leading-tight">
                                        {movie.title}
                                    </h3>

                                    <div className="flex items-center gap-3 text-xs opacity-90 font-medium mb-2">
                                        <span className="flex items-center gap-1 bg-yellow-500/20 px-1.5 py-0.5 rounded text-yellow-400">
                                            ★ {movie.rate}
                                        </span>
                                        <span>{movie.rank}</span>
                                        <span className="border border-white/30 px-1.5 py-0.5 rounded text-[10px]">HD</span>
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
    )
}